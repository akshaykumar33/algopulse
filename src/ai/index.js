/**
 * Provider-neutral AI entry point.
 *   complete({ system, prompt, schema?, cache? }) -> string
 * Picks the provider (settings → AI_PROVIDER → first configured), and caches every
 * response on disk under .cache/ai/ keyed by provider + model + inputs, so repeating
 * a question costs nothing and works offline.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { REPO_ROOT, env, readSettings, writeSettings } = require('./config');
const localVoice = require('./localVoice');

const PROVIDERS = {
  gemini: require('./providers/gemini'),
  anthropic: require('./providers/anthropic'),
  openai: require('./providers/openai'),
  ollama: require('./providers/ollama'),
};
const ORDER = ['gemini', 'anthropic', 'openai', 'ollama'];
const CACHE_DIR = path.join(REPO_ROOT, '.cache', 'ai');

function activeProvider() {
  const chosen = readSettings().provider || env('AI_PROVIDER');
  if (chosen && PROVIDERS[chosen]) return PROVIDERS[chosen];
  return ORDER.map((id) => PROVIDERS[id]).find((p) => p.isConfigured()) || null;
}

function isReady() {
  const p = activeProvider();
  return Boolean(p && p.isConfigured());
}

function status() {
  const active = activeProvider();
  return {
    active: active ? { id: active.id, label: active.label, model: active.getModel(), ready: active.isConfigured() } : null,
    providers: ORDER.map((id) => {
      const p = PROVIDERS[id];
      return { id, label: p.label, model: p.getModel(), fallbacks: p.fallbacks(), keyName: p.keyName, configured: p.isConfigured() };
    }),
    canHear: PROVIDERS.gemini.isConfigured(),
    cache: cacheStats(),
    repoRoot: REPO_ROOT,
  };
}

function setProvider(id) {
  if (!PROVIDERS[id]) throw new Error(`Unknown provider "${id}"`);
  writeSettings({ provider: id });
  return status();
}

/* ---------- response cache ---------- */

function cacheKey(parts) {
  return crypto.createHash('sha256').update(JSON.stringify(parts)).digest('hex').slice(0, 32);
}

function cacheStats() {
  try {
    const files = fs.readdirSync(CACHE_DIR).filter((f) => f.endsWith('.json'));
    const bytes = files.reduce((n, f) => n + fs.statSync(path.join(CACHE_DIR, f)).size, 0);
    return { entries: files.length, bytes };
  } catch {
    return { entries: 0, bytes: 0 };
  }
}

function clearCache() {
  fs.rmSync(CACHE_DIR, { recursive: true, force: true });
  return cacheStats();
}

// Errors a lower model could get past: overload, rate/quota limits, retired or unknown
// models, timeouts, empty or truncated answers. Not auth or permission problems.
function isRetryable(err) {
  const m = String(err && err.message);
  if (/quota exceeded|rate-limit|resource_exhausted|429|too many requests|retry in/i.test(m)) return true;
  if (/api key|apikey|unauthori[sz]ed|permission|forbidden|invalid.*key|401|403|credit balance|no credits remaining/i.test(m)) return false;
  return true;
}

// Latency-bound calls: start the best model, and if it has not answered within STAGGER_MS
// also start the next one; the first answer wins, so a slow or overloaded top model
// costs at most a short head start instead of its whole timeout.
const STAGGER_MS = 1500;
function staggered(models, ask, fail) {
  return new Promise((resolve, reject) => {
    let next = 0;
    let running = 0;
    let done = false;
    const launch = () => {
      if (done || next >= models.length) {
        if (!done && running === 0) reject(new Error('no model answered'));
        return;
      }
      const candidate = models[next++];
      running++;
      let movedOn = false;
      const timer = setTimeout(() => {
        movedOn = true;
        launch();
      }, STAGGER_MS);
      ask(candidate).then(
        (text) => {
          clearTimeout(timer);
          if (done) return;
          done = true;
          resolve({ text, candidate });
        },
        (err) => {
          clearTimeout(timer);
          running--;
          if (done) return;
          fail(candidate, err);
          if (!movedOn) launch();
          else if (running === 0 && next >= models.length) reject(err);
        }
      );
    };
    launch();
  });
}

async function complete({ system = '', prompt, schema = null, maxTokens, cache = true, thinking, timeoutMs }) {
  const provider = activeProvider();
  if (!provider || !provider.isConfigured()) {
    throw new Error('No AI provider is set up. Open the Guide → "Choose your AI" to add a key (or start Ollama).');
  }
  const model = provider.getModel();
  const key = cacheKey([provider.id, model, system, prompt, schema]);
  const file = path.join(CACHE_DIR, `${key}.json`);

  if (cache && fs.existsSync(file)) {
    return { text: JSON.parse(fs.readFileSync(file, 'utf-8')).text, provider: provider.id, model, cached: true };
  }

  // Provider ladder: active provider first, followed by other configured providers as fallback
  const providerLadder = [provider, ...ORDER.map((id) => PROVIDERS[id]).filter((p) => p && p.id !== provider.id && p.isConfigured())];
  const allTried = [];

  for (const curProvider of providerLadder) {
    const curModel = curProvider.getModel();
    const full = [...new Set([curModel, ...curProvider.fallbacks()])];
    const awake = full.filter((m) => (restingUntil.get(`${curProvider.id}:${m}`) || 0) < Date.now());
    const modelLadder = awake.length ? awake : full;
    const ask = (candidate) => curProvider.complete({ system, prompt, schema, maxTokens, model: candidate, thinking, ...(timeoutMs ? { timeoutMs } : {}) });
    const fail = (candidate, err) => {
      allTried.push(`${curProvider.id}:${candidate}: ${err.message}`);
      rest(`${curProvider.id}:${candidate}`, err);
    };
    if (timeoutMs) {
      try {
        const { text, candidate } = await staggered(modelLadder, ask, fail);
        if (allTried.length) console.warn(`[ai] ${model} unavailable; answered by ${curProvider.id}:${candidate}`);
        return { text, provider: curProvider.id, model: candidate, cached: false, ...(allTried.length ? { fallbackFrom: `${provider.id}:${model}`, tried: allTried } : {}) };
      } catch {
        continue;
      }
    }
    for (const candidate of modelLadder) {
      try {
        const text = await ask(candidate);
        fs.mkdirSync(CACHE_DIR, { recursive: true });
        fs.writeFileSync(file, JSON.stringify({ provider: curProvider.id, model: candidate, at: new Date().toISOString(), text }), 'utf-8');
        if (allTried.length) console.warn(`[ai] ${model} failed; answered by fallback ${curProvider.id}:${candidate}`);
        return {
          text,
          provider: curProvider.id,
          model: candidate,
          cached: false,
          ...(allTried.length ? { fallbackFrom: `${provider.id}:${model}`, tried: allTried } : {}),
        };
      } catch (err) {
        fail(candidate, err);
        // If this provider has exhausted credits or has an invalid key, don't try its other models — move to the next provider
        if (/credit_balance_exhausted|no credits remaining|credit balance|401|invalid.*key/i.test(err.message)) {
          break;
        }
        if (!isRetryable(err)) break;
      }
    }
  }

  throw new Error(`every configured provider failed — ${allTried.join(' | ')}`);
}

/* ---------- voice: listening and speaking (Gemini primary, OpenAI TTS fallback) ---------- */

const TTS_DIR = path.join(REPO_ROOT, '.cache', 'tts');
const canHear = () => Boolean(PROVIDERS.openai.isConfigured() || PROVIDERS.gemini.isConfigured() || localVoice.status().available);

// Models that just said "quota" or "busy" sit out for a while, so the next sentence goes
// straight to one that answers instead of paying a failed round trip per busy model.
const restingUntil = new Map();
function rest(model, err) {
  const m = String(err.message);
  const hinted = m.match(/retry in ([\d.]+)s/i);
  const quota = /quota|resource_exhausted|429/i.test(m);
  const ms = hinted ? Math.min(Number(hinted[1]) * 1000, 30 * 60 * 1000) : quota ? 10 * 60 * 1000 : 15 * 60 * 1000;
  restingUntil.set(model, Date.now() + ms);
}

// Walks a model ladder, stepping down on retryable errors, like complete() does.
async function ladder(models, run) {
  const tried = [];
  const unique = [...new Set(models)];
  const awake = unique.filter((m) => (restingUntil.get(m) || 0) < Date.now());
  for (const model of awake.length ? awake : unique) {
    try {
      return { ...(await run(model)), model, ...(tried.length ? { tried } : {}) };
    } catch (err) {
      tried.push(`${model}: ${err.message}`);
      if (!isRetryable(err)) throw err;
      rest(model, err);
    }
  }
  throw new Error(`every voice model failed — ${tried.join(' | ')}`);
}

// Audio in, structured JSON out: the model hears the voice itself, so it follows any
// language and mid-sentence switches the browser's one-language recogniser cannot.
async function listen({ prompt, schema, audio }) {
  if (!PROVIDERS.gemini.isConfigured()) throw new Error('Listening in any language needs a Gemini key (Guide → Choose your AI).');
  const g = PROVIDERS.gemini;
  const models = [env('GEMINI_LISTEN_MODEL'), g.getModel(), ...g.fallbacks()].filter(Boolean);
  const unique = [...new Set(models)];
  const awake = unique.filter((m) => (restingUntil.get(m) || 0) < Date.now());
  const tried = [];
  const ask = (model) => g.generate({
    model,
    parts: [{ inlineData: { mimeType: audio.mime, data: audio.data } }, { text: prompt }],
    schema,
    maxTokens: 2000,
    thinking: 'low',
    timeoutMs: 10000,
  });
  const fail = (model, err) => {
    tried.push(`${model}: ${err.message}`);
    rest(model, err);
  };
  try {
    const { text, candidate } = await staggered(awake.length ? awake : unique, ask, fail);
    return { text, model: candidate, ...(tried.length ? { tried } : {}) };
  } catch {
    throw new Error(`every listening model failed — ${tried.join(' | ')}`);
  }
}

const voiceOrchestrator = require('./voice');

// Text in, neural audio out, cached on disk so repeated lines play instantly.
async function speech({ text, voice, style, lang, mood }) {
  try {
    return await voiceOrchestrator.synthesize({ text, lang: lang || 'en-US', mood: mood || 'flirt', voice });
  } catch (err) {
    throw new Error(`The AI voice failed — ${err.message}`);
  }
}

module.exports = { isRetryable, PROVIDERS, activeProvider, isReady, status, setProvider, complete, clearCache, listen, speech, canHear };
