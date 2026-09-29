/**
 * Google Gemini provider — native HTTPS, no dependencies.
 * Key: GEMINI_API_KEY (or GOOGLE_API_KEY). Model: GEMINI_MODEL (default gemini-3.8-flash).
 * Effort: GEMINI_THINKING = low | medium | high (default high) on Gemini 3 models.
 */

const https = require('https');
const { env } = require('../config');

// Gemini's responseSchema is an OpenAPI subset: upper-case types, no additionalProperties.
function toGeminiSchema(schema) {
  if (Array.isArray(schema)) return schema.map(toGeminiSchema);
  if (!schema || typeof schema !== 'object') return schema;
  const out = {};
  for (const [k, v] of Object.entries(schema)) {
    if (k === 'additionalProperties') continue;
    if (k === 'type' && typeof v === 'string') out.type = v.toUpperCase();
    else out[k] = toGeminiSchema(v);
  }
  return out;
}

module.exports = {
  id: 'gemini',
  label: 'Google Gemini',
  keyName: 'GEMINI_API_KEY',
  getKey: () => env('GEMINI_API_KEY') || env('GOOGLE_API_KEY'),
  getModel: () => env('GEMINI_MODEL') || 'gemini-3.8-flash',
  isConfigured() {
    return Boolean(this.getKey());
  },

  // Fallback ladder, one level down at a time; override with a comma list in the env.
  fallbacks() {
    const own = env(this.fallbackEnv);
    return own ? own.split(',').map((m) => m.trim()).filter(Boolean) : ["gemini-3.7-flash","gemini-3.6-flash","gemini-3.5-flash","gemini-2.5-flash"];
  },
  fallbackEnv: 'GEMINI_FALLBACK_MODELS',

  complete({ system, prompt, schema, maxTokens = 8192, timeoutMs = 90000, model: pick }) {
    const apiKey = this.getKey();
    const model = pick || this.getModel();
    if (!apiKey) return Promise.reject(new Error('GEMINI_API_KEY is not set'));

    const payload = JSON.stringify({
      ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        // Gemini 3 takes a thinking level and is tuned for its default temperature;
        // 2.x models take a token budget and do better cooler for factual docs.
        ...(/^gemini-[3-9]/.test(model)
          ? { thinkingConfig: { thinkingLevel: env('GEMINI_THINKING') || 'high' } }
          : { temperature: 0.2, thinkingConfig: { thinkingBudget: schema ? 2048 : 1024 } }),
        maxOutputTokens: maxTokens,
        ...(schema ? { responseMimeType: 'application/json', responseSchema: toGeminiSchema(schema) } : {}),
      },
    });

    return new Promise((resolve, reject) => {
      const req = https.request(
        {
          hostname: 'generativelanguage.googleapis.com',
          path: `/v1beta/models/${encodeURIComponent(model)}:generateContent`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
            // Header, not ?key= — a key in the URL leaks into proxies and error messages.
            'x-goog-api-key': apiKey,
          },
          timeout: timeoutMs,
        },
        (res) => {
          let body = '';
          res.on('data', (c) => (body += c));
          res.on('end', () => {
            let json;
            try {
              json = JSON.parse(body);
            } catch {
              return reject(new Error(`Gemini returned non-JSON (HTTP ${res.statusCode})`));
            }
            if (res.statusCode !== 200) return reject(new Error(`${model}: ${json.error?.message || `HTTP ${res.statusCode}`}`));
            const candidate = json.candidates?.[0];
            // Thinking models may split the answer across parts; skip thought parts.
            const text = (candidate?.content?.parts || []).filter((p) => p.text && !p.thought).map((p) => p.text).join('');
            if (!text) return reject(new Error(`${model}: empty response (${candidate?.finishReason || json.promptFeedback?.blockReason || 'unknown'})`));
            if (candidate.finishReason === 'MAX_TOKENS') return reject(new Error(`${model}: response truncated at ${maxTokens} tokens`));
            resolve(text);
          });
        }
      );
      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error(`${model}: timed out after ${timeoutMs / 1000}s`));
      });
      req.end(payload);
    });
  },
};
