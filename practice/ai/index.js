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
  if (/api key|apikey|unauthori[sz]ed|permission|forbidden|invalid.*key|401|403|billing|credit balance/i.test(m)) return false;
  return true;
}

async function complete({ system = '', prompt, schema = null, maxTokens, cache = true }) {
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
      const text = await provider.complete({ system, prompt, schema, maxTokens, model: candidate });
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

module.exports = { isRetryable, PROVIDERS, activeProvider, isReady, status, setProvider, complete, clearCache };
