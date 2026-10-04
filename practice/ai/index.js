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
  if (/api key|apikey|unauthori[sz]ed|permission|forbidden|invalid.*key|401|403|credit balance/i.test(m)) return false;
  return true;
}


async function complete({ system = '', prompt, schema = null, maxTokens, cache = true, thinking }) {
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
  // Try the chosen model, then step down the provider's ladder one level at a time.
  const ladder = [model, ...provider.fallbacks().filter((m) => m !== model)];
  const tried = [];
  for (const candidate of ladder) {
    try {
      const text = await provider.complete({ system, prompt, schema, maxTokens, model: candidate, thinking });
      fs.mkdirSync(CACHE_DIR, { recursive: true });
      fs.writeFileSync(file, JSON.stringify({ provider: provider.id, model: candidate, at: new Date().toISOString(), text }), 'utf-8');
      if (tried.length) console.warn(`[ai] ${model} failed; answered by fallback ${candidate}`);
      return { text, provider: provider.id, model: candidate, cached: false, ...(tried.length ? { fallbackFrom: model, tried } : {}) };
    } catch (err) {
      tried.push(`${candidate}: ${err.message}`);
      // A bad key or missing permission fails the same way on every model — stop.
      if (!isRetryable(err)) throw err;
    }
  }
  throw new Error(`every ${provider.label} model failed — ${tried.join(' | ')}`);
}

/* ---------- voice: listening and speaking (Gemini only; any language, mixed too) ---------- */

const TTS_DIR = path.join(REPO_ROOT, '.cache', 'tts');
const canHear = () => PROVIDERS.gemini.isConfigured();

// Models that just said "quota" or "busy" sit out for a while, so the next sentence goes
// straight to one that answers instead of paying a failed round trip per busy model.
const restingUntil = new Map();
function rest(model, err) {
  const m = String(err.message);
  const hinted = m.match(/retry in ([\d.]+)s/i);
  const quota = /quota|resource_exhausted|429/i.test(m);
  const ms = hinted ? Math.min(Number(hinted[1]) * 1000, 30 * 60 * 1000) : quota ? 10 * 60 * 1000 : 60 * 1000;
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
  if (!canHear()) throw new Error('Listening in any language needs a Gemini key (Guide → Choose your AI).');
  const g = PROVIDERS.gemini;
  const full = ['gemini-2.5-flash', 'gemini-flash-lite-latest', 'gemini-3.6-flash'];
  const models = [env('GEMINI_LISTEN_MODEL'), ...full, ...g.fallbacks()].filter(Boolean);
  return ladder(models, async (model) => ({
    text: await g.generate({
      model,
      parts: [{ inlineData: { mimeType: audio.mime, data: audio.data } }, { text: prompt }],
      schema,
      maxTokens: 2000,
      thinking: 'low',
      timeoutMs: 30000,
    }),
  }));
}

// Text in, 24 kHz PCM out, cached on disk so repeated lines play instantly.
async function speech({ text, voice, style }) {
  if (!canHear()) throw new Error('The AI voice needs a Gemini key.');
  const g = PROVIDERS.gemini;
  const key = cacheKey(['tts', voice, style, text]);
  const file = path.join(TTS_DIR, `${key}.json`);
  if (fs.existsSync(file)) return { ...JSON.parse(fs.readFileSync(file, 'utf-8')), cached: true };
  const models = (env('GEMINI_TTS_MODELS') || 'gemini-3.8-flash-tts,gemini-3.8-flash-lite-tts,gemini-3.1-flash-tts-preview').split(',').map((m) => m.trim()).filter(Boolean);
  const out = await ladder(models, (model) => g.speak({ text, voice, style, model }));
  fs.mkdirSync(TTS_DIR, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(out), 'utf-8');
  return { ...out, cached: false };
}

module.exports = { isRetryable, PROVIDERS, activeProvider, isReady, status, setProvider, complete, clearCache, listen, speech, canHear };
