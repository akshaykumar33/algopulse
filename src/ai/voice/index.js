const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const edge = require('./edge');
const openai = require('./openai');
const mms = require('./mms');
const { detectLang } = require('./detect');
const voicesRegistry = require('./voices.json');

const REPO_ROOT = path.join(__dirname, '..', '..', '..');
const CACHE_DIR = path.join(REPO_ROOT, '.cache', 'tts-v2');

const hashKey = (items) => crypto.createHash('sha256').update(JSON.stringify(items)).digest('hex').slice(0, 32);

async function synthesize({ text, lang = 'en-US', mood = 'flirt', voice = '' }) {
  const clean = String(text || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '').trim();
  if (!clean) throw new Error('Empty text for speech synthesis');

  const resolvedLang = lang === 'auto' || !lang ? detectLang(clean) || 'en-US' : lang;
  const key = hashKey([clean, resolvedLang, mood, voice]);
  const cachedFile = path.join(CACHE_DIR, `${key}.json`);

  if (fs.existsSync(cachedFile)) {
    try {
      return { ...JSON.parse(fs.readFileSync(cachedFile, 'utf-8')), cached: true };
    } catch { /* corrupted cache: recompute */ }
  }

  const errors = [];

  // Tier 1: Microsoft Edge Neural TTS (Free, Studio-Grade Multilingual Female Voices)
  try {
    const res = await edge.speak(clean, resolvedLang, mood);
    if (res && (res.audio || res.pcm)) {
      const output = { ...res, cached: false, lang: resolvedLang };
      fs.mkdirSync(CACHE_DIR, { recursive: true });
      fs.writeFileSync(cachedFile, JSON.stringify(output), 'utf-8');
      return output;
    }
  } catch (err) {
    errors.push(`edge-neural: ${err.message}`);
  }

  // Tier 2: OpenAI TTS-1 Nova / Shimmer Studio Fallback
  try {
    const res = await openai.speak({ text: clean, voice: voice || 'nova' });
    if (res && res.pcm) {
      const output = { ...res, cached: false, lang: resolvedLang, engine: 'openai' };
      fs.mkdirSync(CACHE_DIR, { recursive: true });
      fs.writeFileSync(cachedFile, JSON.stringify(output), 'utf-8');
      return output;
    }
  } catch (err) {
    errors.push(`openai: ${err.message}`);
  }

  // Tier 3: Local Meta MMS Offline Fallback
  try {
    const res = await mms.speak(clean, resolvedLang, mood);
    if (res && (res.pcm || res.audio)) {
      const output = { ...res, cached: false, lang: resolvedLang, engine: 'mms-local' };
      fs.mkdirSync(CACHE_DIR, { recursive: true });
      fs.writeFileSync(cachedFile, JSON.stringify(output), 'utf-8');
      return output;
    }
  } catch (err) {
    errors.push(`mms-local: ${err.message}`);
  }

  throw new Error(`Voice synthesis failed across all tiers: ${errors.join(' | ')}`);
}

module.exports = {
  synthesize,
  resolveVoice: edge.resolveVoice,
  voices: voicesRegistry,
  detectLang,
};
