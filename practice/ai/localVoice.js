/**
 * The buddy's own voice, on this PC: starts tools/tts/server.py (Meta MMS models on the
 * GPU) when its Python environment exists, and asks it to speak when the Gemini voice
 * is out of quota. Clips are cached on disk like the AI voice's, so repeats are instant.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const { spawn } = require('child_process');

const REPO_ROOT = path.join(__dirname, '..', '..');
const TTS_DIR = path.join(REPO_ROOT, 'tools', 'tts');
const venv = (name) => path.join(TTS_DIR, name, process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
// The expressive Parler voice when its environment exists, else the plain MMS voice.
const PARLER = fs.existsSync(venv('.venv-parler')) && process.env.LOCAL_VOICE !== 'mms';
const PYTHON = PARLER ? venv('.venv-parler') : venv('.venv');
const SCRIPT = PARLER ? 'parler_server.py' : 'server.py';
const CACHE_DIR = path.join(REPO_ROOT, '.cache', 'tts-local');
const PORT = Number(process.env.TTS_PORT) || 3334;

let child = null;
let ready = false;

const available = () => fs.existsSync(PYTHON);

function request(method, route, body, timeoutMs = 20000) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : '';
    const req = http.request(
      { host: '127.0.0.1', port: PORT, path: route, method, timeout: timeoutMs, headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } },
      (res) => {
        let raw = '';
        res.on('data', (c) => (raw += c));
        res.on('end', () => {
          try {
            const json = JSON.parse(raw);
            if (res.statusCode !== 200) return reject(new Error(json.error || `local voice: HTTP ${res.statusCode}`));
            resolve(json);
          } catch {
            reject(new Error('local voice returned non-JSON'));
          }
        });
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('local voice timed out'));
    });
    req.end(payload);
  });
}

// Start the Python service once; it loads each voice on first use to keep memory low.
function start() {
  if (child || !available()) return;
  child = spawn(PYTHON, [path.join(TTS_DIR, SCRIPT)], { cwd: TTS_DIR, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  child.stdout.on('data', (d) => {
    const line = String(d).trim();
    if (/local voice on/.test(line)) ready = true;
    if (line) console.log(line);
  });
  child.stderr.on('data', (d) => {
    const line = String(d).trim();
    if (/error|traceback/i.test(line)) console.warn(`[tts] ${line.split('\n').pop()}`);
  });
  child.on('exit', (code) => {
    ready = false;
    child = null;
    if (code) console.warn(`[tts] local voice stopped (exit ${code})`);
  });
  process.on('exit', () => child?.kill());
}

const clipFile = (parts) => path.join(CACHE_DIR, `${crypto.createHash('sha256').update(JSON.stringify(parts)).digest('hex').slice(0, 32)}.json`);
const readClip = (file) => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf-8')) : null);
function saveClip(file, clip) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(clip), 'utf-8');
}

// Parler is too slow to answer live, so it re-voices lines one at a time in the
// background; the next time the buddy says one, the expressive clip plays instead.
const upgrades = [];
let upgrading = false;
async function upgradeNext() {
  if (upgrading || !upgrades.length) return;
  upgrading = true;
  const { text, lang, mood, file } = upgrades.shift();
  try {
    if (!fs.existsSync(file)) saveClip(file, await request('POST', '/speak', { text, lang, mood }, 120000));
  } catch { /* try again the next time the line is said */ }
  upgrading = false;
  upgradeNext();
}

async function speak(text, lang, mood = '') {
  if (!ready) throw new Error('The local voice is not running.');
  const best = PARLER && clipFile(['parler', lang, mood, text]);
  const hit = best && readClip(best);
  if (hit) return { ...hit, cached: true, engine: 'parler' };
  const fast = clipFile(['mms', lang, text]);
  let clip = readClip(fast);
  if (!clip) {
    clip = await request('POST', '/speak', PARLER ? { text, lang, engine: 'fast' } : { text, lang }, 20000);
    saveClip(fast, clip);
  }
  if (best && upgrades.length < 50 && !upgrades.some((u) => u.file === best)) {
    upgrades.push({ text, lang, mood, file: best });
    upgradeNext();
  }
  return { ...clip, engine: 'mms' };
}

const warm = (lang) => (ready ? request('POST', '/warm', { lang }, 120000).catch(() => null) : Promise.resolve(null));
const status = () => ({ available: available(), ready, engine: PARLER ? 'parler' : 'mms' });

module.exports = { start, speak, warm, status };
