/**
 * Ollama provider — models running on your own PC. Free and fully private: nothing
 * leaves the machine. Host: OLLAMA_HOST (default http://127.0.0.1:11434).
 * Model: OLLAMA_MODEL (default qwen2.5-coder:7b — pull it with `ollama pull qwen2.5-coder:7b`).
 */

const http = require('http');
const https = require('https');
const { env } = require('../config');

const hostUrl = () => new URL(env('OLLAMA_HOST') || 'http://127.0.0.1:11434');

function request(pathname, body, timeoutMs) {
  const url = hostUrl();
  const lib = url.protocol === 'https:' ? https : http;
  const payload = body ? JSON.stringify(body) : null;
  return new Promise((resolve, reject) => {
    const req = lib.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: pathname,
        method: payload ? 'POST' : 'GET',
        headers: payload ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } : {},
        timeout: timeoutMs,
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (res.statusCode !== 200) return reject(new Error(`Ollama: ${json.error || `HTTP ${res.statusCode}`}`));
            resolve(json);
          } catch {
            reject(new Error(`Ollama returned non-JSON (HTTP ${res.statusCode})`));
          }
        });
      }
    );
    req.on('error', () => reject(new Error(`Ollama is not running at ${url.origin} — start it with \`ollama serve\``)));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Ollama timed out after ${timeoutMs / 1000}s`));
    });
    req.end(payload || undefined);
  });
}

let reachable = null;
let checkedAt = 0;

module.exports = {
  id: 'ollama',
  label: 'Ollama (local)',
  keyName: null,
  getKey: () => null,
  getModel: () => env('OLLAMA_MODEL') || 'qwen2.5-coder:7b',
  // No key to check — "configured" means the daemon answered recently (cached for 30s).
  isConfigured() {
    if (Date.now() - checkedAt > 30000) {
      checkedAt = Date.now();
      request('/api/tags', null, 1500).then(() => (reachable = true), () => (reachable = false));
    }
    return reachable === true;
  },

  // Fallback ladder, one level down at a time; override with a comma list in the env.
  fallbacks() {
    const own = env(this.fallbackEnv);
    return own ? own.split(',').map((m) => m.trim()).filter(Boolean) : [];
  },
  fallbackEnv: 'OLLAMA_FALLBACK_MODELS',

  async complete({ system, prompt, schema, timeoutMs = 300000, model: pick }) {
    const model = pick || this.getModel();
    const res = await request(
      '/api/chat',
      {
        model,
        stream: false,
        messages: [...(system ? [{ role: 'system', content: system }] : []), { role: 'user', content: prompt }],
        ...(schema ? { format: schema } : {}),
        options: { temperature: 0.2 },
      },
      timeoutMs
    );
    const text = res.message?.content;
    if (!text) throw new Error(`${model}: empty response`);
    return text;
  },
};
