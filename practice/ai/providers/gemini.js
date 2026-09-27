/**
 * Google Gemini provider — native HTTPS, no dependencies.
 * Key: GEMINI_API_KEY (or GOOGLE_API_KEY). Model: GEMINI_MODEL (default gemini-2.5-flash).
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
  getModel: () => env('GEMINI_MODEL') || 'gemini-2.5-flash',
  isConfigured() {
    return Boolean(this.getKey());
  },

  complete({ system, prompt, schema, maxTokens = 8192, timeoutMs = 90000 }) {
    const apiKey = this.getKey();
    const model = this.getModel();
    if (!apiKey) return Promise.reject(new Error('GEMINI_API_KEY is not set'));

    const payload = JSON.stringify({
      ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: maxTokens,
        thinkingConfig: { thinkingBudget: schema ? 2048 : 1024 },
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
