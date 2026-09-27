/**
 * OpenAI provider — Chat Completions over native HTTPS, no dependencies.
 * Key: OPENAI_API_KEY. Model: OPENAI_MODEL (set it to a model your account can use).
 */

const https = require('https');
const { env } = require('../config');

module.exports = {
  id: 'openai',
  label: 'OpenAI',
  keyName: 'OPENAI_API_KEY',
  getKey: () => env('OPENAI_API_KEY'),
  getModel: () => env('OPENAI_MODEL') || 'gpt-5-mini',
  isConfigured() {
    return Boolean(this.getKey());
  },

  complete({ system, prompt, schema, maxTokens = 16000, timeoutMs = 120000 }) {
    const apiKey = this.getKey();
    const model = this.getModel();
    if (!apiKey) return Promise.reject(new Error('OPENAI_API_KEY is not set'));

    const payload = JSON.stringify({
      model,
      max_completion_tokens: maxTokens,
      messages: [...(system ? [{ role: 'system', content: system }] : []), { role: 'user', content: prompt }],
      ...(schema ? { response_format: { type: 'json_schema', json_schema: { name: 'result', strict: true, schema } } } : {}),
    });

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
            if (res.statusCode !== 200) return reject(new Error(`${model}: ${json.error?.message || `HTTP ${res.statusCode}`}`));
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
};
