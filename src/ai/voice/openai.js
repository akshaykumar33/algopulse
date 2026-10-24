const https = require('https');

async function speak({ text, voice = 'nova', model = 'tts-1', timeoutMs = 25000 }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.includes('your_')) throw new Error('OPENAI_API_KEY is not set');

  const clean = String(text || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '').trim();
  if (!clean) throw new Error('Empty text for speech synthesis');

  const payload = JSON.stringify({
    model,
    input: clean,
    voice: ['nova', 'shimmer', 'alloy', 'echo', 'fable', 'onyx'].includes(voice) ? voice : 'nova',
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
          resolve({ pcm: buf.toString('base64'), mime: 'audio/L16;rate=24000', engine: 'openai' });
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
}

module.exports = { speak };
