/**
 * Edge Neural TTS Engine:
 * Connects to the local Edge Neural TTS server (tools/tts/server.py) or falls back
 * directly to the Python edge_tts module. Produces studio-grade neural audio
 * in 50+ languages with zero quota and zero API cost.
 */

const http = require('http');
const path = require('path');
const fs = require('fs');
const { execFile } = require('child_process');

const REPO_ROOT = path.join(__dirname, '..', '..', '..');
const TTS_DIR = path.join(REPO_ROOT, 'tools', 'tts');
const PYTHON = path.join(TTS_DIR, '.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
const PORT = Number(process.env.TTS_PORT) || 3334;

const VOICES = {
  'hi-in': 'hi-IN-SwaraNeural',
  'hi': 'hi-IN-SwaraNeural',
  'en-us': 'en-US-JennyNeural',
  'en': 'en-US-JennyNeural',
  'en-in': 'en-IN-NeerjaNeural',
  'kn-in': 'kn-IN-SapnaNeural',
  'kn': 'kn-IN-SapnaNeural',
  'mr-in': 'mr-IN-AarohiNeural',
  'mr': 'mr-IN-AarohiNeural',
  'ta-in': 'ta-IN-PallaviNeural',
  'ta': 'ta-IN-PallaviNeural',
  'te-in': 'te-IN-ShrutiNeural',
  'te': 'te-IN-ShrutiNeural',
  'bn-in': 'bn-IN-TanishaaNeural',
  'bn': 'bn-IN-TanishaaNeural',
  'gu-in': 'gu-IN-DhwaniNeural',
  'gu': 'gu-IN-DhwaniNeural',
  'ml-in': 'ml-IN-SobhanaNeural',
  'ml': 'ml-IN-SobhanaNeural',
  'pa-in': 'pa-IN-GurpreetNeural',
  'pa': 'pa-IN-GurpreetNeural',
  'ur-pk': 'ur-PK-UzmaNeural',
  'ur': 'ur-PK-UzmaNeural',
  'es-es': 'es-ES-ElviraNeural',
  'es': 'es-ES-ElviraNeural',
  'fr-fr': 'fr-FR-DeniseNeural',
  'fr': 'fr-FR-DeniseNeural',
  'ja-jp': 'ja-JP-NanamiNeural',
  'ja': 'ja-JP-NanamiNeural',
  'ko-kr': 'ko-KR-SunHiNeural',
  'ko': 'ko-KR-SunHiNeural',
  'zh-cn': 'zh-CN-XiaoxiaoNeural',
  'zh': 'zh-CN-XiaoxiaoNeural',
  'de-de': 'de-DE-KatjaNeural',
  'de': 'de-DE-KatjaNeural',
  'it-it': 'it-IT-ElsaNeural',
  'it': 'it-IT-ElsaNeural',
  'ru-ru': 'ru-RU-SvetlanaNeural',
  'ru': 'ru-RU-SvetlanaNeural',
  'ar-sa': 'ar-SA-ZariyahNeural',
  'ar': 'ar-SA-ZariyahNeural',
};

function resolveVoice(lang = 'en-US') {
  const key = String(lang).toLowerCase().replace(/_/g, '-');
  return VOICES[key] || VOICES[key.split('-')[0]] || 'en-US-JennyNeural';
}

function requestHttp(text, lang, mood, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ text, lang, mood });
    const req = http.request(
      {
        host: '127.0.0.1',
        port: PORT,
        path: '/speak',
        method: 'POST',
        timeout: timeoutMs,
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
      },
      (res) => {
        let raw = '';
        res.on('data', (c) => (raw += c));
        res.on('end', () => {
          try {
            const data = JSON.parse(raw);
            if (res.statusCode !== 200) return reject(new Error(data.error || `HTTP ${res.statusCode}`));
            resolve(data);
          } catch {
            reject(new Error('TTS server returned non-JSON'));
          }
        });
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('TTS request timed out'));
    });
    req.end(payload);
  });
}

function runPythonCli(text, voice) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(PYTHON)) return reject(new Error('Python TTS venv not found'));
    const tmp = path.join(TTS_DIR, `.cache`, `tmp_${Date.now()}_${Math.random().toString(36).slice(2)}.mp3`);
    fs.mkdirSync(path.dirname(tmp), { recursive: true });
    execFile(PYTHON, ['-m', 'edge_tts', '-t', text, '-v', voice, '--write-media', tmp], { timeout: 15000 }, (err) => {
      if (err) return reject(err);
      try {
        if (!fs.existsSync(tmp)) return reject(new Error('Output audio file missing'));
        const buf = fs.readFileSync(tmp);
        fs.unlinkSync(tmp);
        resolve({
          audio: buf.toString('base64'),
          format: 'mp3',
          voice,
          engine: 'edge-neural',
          rate: 24000,
        });
      } catch (e) {
        reject(e);
      }
    });
  });
}

async function speak(text, lang = 'en-US', mood = '') {
  const clean = String(text || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '').trim();
  if (!clean) throw new Error('Empty text');

  // 1. Try local daemon HTTP endpoint
  try {
    return await requestHttp(clean, lang, mood, 4000);
  } catch {
    // 2. Direct CLI fallback
    const voice = resolveVoice(lang);
    return runPythonCli(clean, voice);
  }
}

module.exports = { speak, resolveVoice, VOICES };
