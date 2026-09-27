/**
 * Anthropic Claude provider — official SDK (@anthropic-ai/sdk), loaded lazily so the rest
 * of the app works without it installed.
 * Key: ANTHROPIC_API_KEY (or an `ant auth login` profile). Model: ANTHROPIC_MODEL (default claude-opus-5).
 */

const { env } = require('../config');

let client = null;
function getClient() {
  if (client) return client;
  let Anthropic;
  try {
    Anthropic = require('@anthropic-ai/sdk');
  } catch {
    throw new Error('Claude needs the Anthropic SDK: run `npm install` in the repo root.');
  }
  Anthropic = Anthropic.default || Anthropic;
  const apiKey = env('ANTHROPIC_API_KEY');
  // With no key, the SDK resolves ANTHROPIC_AUTH_TOKEN / `ant auth login` profiles itself.
  client = apiKey ? new Anthropic({ apiKey }) : new Anthropic();
  return client;
}

module.exports = {
  id: 'anthropic',
  label: 'Anthropic Claude',
  keyName: 'ANTHROPIC_API_KEY',
  getKey: () => env('ANTHROPIC_API_KEY'),
  getModel: () => env('ANTHROPIC_MODEL') || 'claude-opus-5',
  isConfigured() {
    return Boolean(this.getKey() || env('ANTHROPIC_AUTH_TOKEN'));
  },

  async complete({ system, prompt, schema, maxTokens = 16000 }) {
    const model = this.getModel();
    // Streaming + finalMessage() avoids HTTP timeouts on long generations.
    const stream = getClient().beta.messages.stream({
      model,
      max_tokens: Math.max(maxTokens, 16000),
      thinking: { type: 'adaptive' },
      output_config: {
        effort: 'high',
        ...(schema ? { format: { type: 'json_schema', schema } } : {}),
      },
      // On a policy decline, re-run server-side on Anthropic's recommended fallback model.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      // Stable system prompt (grounding) is cached, so follow-up coach questions are cheaper.
      cache_control: { type: 'ephemeral' },
      ...(system ? { system } : {}),
      messages: [{ role: 'user', content: prompt }],
    });
    const message = await stream.finalMessage();

    if (message.stop_reason === 'refusal') {
      throw new Error(`${model} declined this request${message.stop_details?.category ? ` (${message.stop_details.category})` : ''}.`);
    }
    if (message.stop_reason === 'max_tokens') throw new Error(`${model}: response truncated at max_tokens`);
    const text = message.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    if (!text) throw new Error(`${model}: empty response`);
    return text;
  },
};
