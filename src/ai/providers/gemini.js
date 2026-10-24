/**
 * Google Gemini provider — native HTTPS, no dependencies.
 * Key: GEMINI_API_KEY (or GOOGLE_API_KEY). Model: GEMINI_MODEL (default gemini-3.8-flash).
 * Effort: GEMINI_THINKING = low | medium | high (default high) on Gemini 3 models.
 *
 * Besides text, it can listen (audio in, JSON out) and speak (text in, audio out),
 * which the voice companion uses to hear any language and answer in a cute voice.
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

// Gemini 3 takes a thinking level; 2.x takes a token budget. Low effort turns thinking
// off on 2.5 Flash, and sends nothing to the -latest aliases, which reject a budget.
function thinkingFor(model, thinking, schema) {
  const effort = thinking || env('GEMINI_THINKING') || 'high';
  if (/^gemini-[3-9]/.test(model)) return { thinkingConfig: { thinkingLevel: effort } };
  if (effort === 'low') return /^gemini-2\.5-(flash|flash-lite)$/.test(model) ? { thinkingConfig: { thinkingBudget: 0 } } : {};
  if (effort === 'medium') return { temperature: 0.2, thinkingConfig: { thinkingBudget: schema ? 1024 : 512 } };
  return { temperature: 0.2, thinkingConfig: { thinkingBudget: schema ? 2048 : 1024 } };
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

  // Fallback ladder, from top models like 3.8 down to 2.5; override with a comma list in the env.
  fallbacks() {
    const own = env(this.fallbackEnv);
    return own ? own.split(',').map((m) => m.trim()).filter(Boolean) : [
      'gemini-3.8-flash',
      'gemini-3.5-flash-lite',
      'gemini-3.5-flash',
      'gemini-3.7-flash',
      'gemini-3.6-flash',
      'gemini-3-flash-preview',
      'gemini-2.5-pro',
      'gemini-2.5-flash',
      'gemini-flash-latest',
      'gemini-flash-lite-latest',
    ];
  },

  fallbackEnv: 'GEMINI_FALLBACK_MODELS',

  complete({ system, prompt, schema, maxTokens = 8192, timeoutMs = 90000, model: pick, thinking }) {
    return this.generate({ system, parts: [{ text: prompt }], schema, maxTokens, timeoutMs, model: pick, thinking });
  },

  // Text (and optionally audio) in, text out. `parts` may hold inlineData audio.
  async generate({ system, parts, schema, maxTokens = 8192, timeoutMs = 90000, model: pick, thinking }) {
    const model = pick || this.getModel();
    const json = await this.call(model, {
      ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
      contents: [{ role: 'user', parts }],
      generationConfig: {
        ...thinkingFor(model, thinking, schema),
        maxOutputTokens: maxTokens,
        ...(schema ? { responseMimeType: 'application/json', responseSchema: toGeminiSchema(schema) } : {}),
      },
    }, timeoutMs);
    const candidate = json.candidates?.[0];
    // Thinking models may split the answer across parts; skip thought parts.
    const text = (candidate?.content?.parts || []).filter((p) => p.text && !p.thought).map((p) => p.text).join('');
    if (!text) throw new Error(`${model}: empty response (${candidate?.finishReason || json.promptFeedback?.blockReason || 'unknown'})`);
    if (candidate.finishReason === 'MAX_TOKENS') throw new Error(`${model}: response truncated at ${maxTokens} tokens`);
    return text;
  },

  // Text to speech: returns 24 kHz mono 16-bit PCM as base64.
  async speak({ text, voice, style, model, timeoutMs = 30000 }) {
    const json = await this.call(model, {
      contents: [{ role: 'user', parts: [{ text: style ? `Say the following ${style.replace(/^speak\s+/i, '')}: ${text}` : text }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
      },
    }, timeoutMs);
    const part = (json.candidates?.[0]?.content?.parts || []).find((p) => p.inlineData?.data);
    if (!part) throw new Error(`${model}: no audio returned`);
    return { pcm: part.inlineData.data, mime: part.inlineData.mimeType || 'audio/L16;rate=24000' };
  },

  call(model, body, timeoutMs) {
    const apiKey = this.getKey();
    if (!apiKey) return Promise.reject(new Error('GEMINI_API_KEY is not set'));
    const payload = JSON.stringify(body);
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
          let raw = '';
          res.on('data', (c) => (raw += c));
          res.on('end', () => {
            let json;
            try {
              json = JSON.parse(raw);
            } catch {
              return reject(new Error(`Gemini returned non-JSON (HTTP ${res.statusCode})`));
            }
            if (res.statusCode !== 200) return reject(new Error(`${model}: ${json.error?.message || `HTTP ${res.statusCode}`}`));
            resolve(json);
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
