/**
 * OpenAI provider — Chat Completions & TTS over native HTTPS, no dependencies.
 * Key: OPENAI_API_KEY. Model: OPENAI_MODEL (default gpt-4o-mini).
 */

const https = require('https');
const { env } = require('../config');

module.exports = {
  id: 'openai',
  label: 'OpenAI',
  keyName: 'OPENAI_API_KEY',
  getKey: () => env('OPENAI_API_KEY'),
  getModel: () => env('OPENAI_MODEL') || 'gpt-4o-mini',
  isConfigured() {
    return Boolean(this.getKey());
  },

  // Fallback ladder, one level down at a time; override with a comma list in the env.
  fallbacks() {
    const own = env(this.fallbackEnv);
    if (own) return own.split(',').map((m) => m.trim()).filter(Boolean);
    return ['gpt-4o', 'o3-mini', 'gpt-4.1-mini', 'gpt-5.1-chat-latest', 'gpt-3.5-turbo'];
  },
  fallbackEnv: 'OPENAI_FALLBACK_MODELS',

  complete({ system, prompt, schema, maxTokens = 16000, timeoutMs = 120000, model: pick }) {
    const apiKey = this.getKey();
    const model = pick || this.getModel();
    if (!apiKey) return Promise.reject(new Error('OPENAI_API_KEY is not set'));

    const isReasoning = /^o[1-9]/.test(model);
    const isLegacy = /^gpt-3\.5/.test(model);

    const messages = [];
    if (system) {
      messages.push({ role: isReasoning ? 'developer' : 'system', content: system });
    }
    messages.push({ role: 'user', content: prompt });

    const payloadObj = {
      model,
      messages,
      ...(isLegacy ? { max_tokens: Math.min(maxTokens, 4096) } : { max_completion_tokens: maxTokens }),
    };

    if (schema) {
      if (isLegacy) {
        payloadObj.response_format = { type: 'json_object' };
      } else {
        payloadObj.response_format = { type: 'json_schema', json_schema: { name: 'result', strict: true, schema } };
      }
    }

    const payload = JSON.stringify(payloadObj);

    return new Promise((resolve, reject) => {
      const req = https.request(
        {
          hostname: 'api.openai.com',
          path: '/v1/chat/completions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
            Authorization: `Bearer ${apiKey}`,
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
              return reject(new Error(`OpenAI returned non-JSON (HTTP ${res.statusCode})`));
            }
            if (res.statusCode !== 200) {
              const code = json.error?.code ? ` (${json.error.code})` : '';
              return reject(new Error(`${model}: ${json.error?.message || `HTTP ${res.statusCode}`}${code}`));
            }
            const choice = json.choices?.[0];
            if (choice?.message?.refusal) return reject(new Error(`${model} refused: ${choice.message.refusal}`));
            if (choice?.finish_reason === 'length') return reject(new Error(`${model}: response truncated`));
            const text = choice?.message?.content;
            if (!text) return reject(new Error(`${model}: empty response`));
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

  // Text to speech fallback: returns 24 kHz mono 16-bit PCM as base64.
  speak({ text, voice = 'nova', model = 'tts-1', timeoutMs = 30000 }) {
    const apiKey = this.getKey();
    if (!apiKey) return Promise.reject(new Error('OPENAI_API_KEY is not set'));

    const payload = JSON.stringify({
      model,
      input: text,
      voice: ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'].includes(voice) ? voice : 'nova',
      response_format: 'pcm',
    });

    return new Promise((resolve, reject) => {
      const req = https.request(
        {
          hostname: 'api.openai.com',
          path: '/v1/audio/speech',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
            Authorization: `Bearer ${apiKey}`,
          },
          timeout: timeoutMs,
        },
        (res) => {
          const chunks = [];
          res.on('data', (c) => chunks.push(c));
          res.on('end', () => {
            const buf = Buffer.concat(chunks);
            if (res.statusCode !== 200) {
              try {
                const json = JSON.parse(buf.toString('utf-8'));
                return reject(new Error(`${model}: ${json.error?.message || `HTTP ${res.statusCode}`}`));
              } catch {
                return reject(new Error(`${model}: HTTP ${res.statusCode}`));
              }
            }
            resolve({ pcm: buf.toString('base64'), mime: 'audio/L16;rate=24000' });
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

