const test = require('node:test');
const assert = require('node:assert/strict');
const { resolveVoice, voices, detectLang } = require('./index');

test('Multilingual Female Voice Registry', () => {
  assert.equal(resolveVoice('hi-IN'), 'hi-IN-SwaraNeural');
  assert.equal(resolveVoice('en-US'), 'en-US-JennyNeural');
  assert.equal(resolveVoice('en-IN'), 'en-IN-NeerjaNeural');
  assert.equal(resolveVoice('kn-IN'), 'kn-IN-SapnaNeural');
  assert.equal(resolveVoice('mr-IN'), 'mr-IN-AarohiNeural');
  assert.equal(resolveVoice('ta-IN'), 'ta-IN-PallaviNeural');
  assert.equal(resolveVoice('te-IN'), 'te-IN-ShrutiNeural');
  assert.equal(resolveVoice('es-ES'), 'es-ES-ElviraNeural');
  assert.equal(resolveVoice('fr-FR'), 'fr-FR-DeniseNeural');
  assert.equal(resolveVoice('ja-JP'), 'ja-JP-NanamiNeural');
});

test('Language Script and Keyword Detection', () => {
  assert.equal(detectLang('नमस्ते आप कैसे हैं'), 'hi-IN');
  assert.equal(detectLang('ಹೇಗಿದ್ದೀರಾ'), 'kn-IN');
  assert.equal(detectLang('வணக்கம்'), 'ta-IN');
  assert.equal(detectLang('Hola amigo cómo estás'), 'es-ES');
  assert.equal(detectLang('Bonjour mon amour'), 'fr-FR');
  assert.equal(detectLang('niche jao please'), 'hi-IN');
  assert.equal(detectLang('upar chalo na'), 'hi-IN');
});

test('Voices JSON Structure', () => {
  assert.ok(voices.edge['hi-IN']);
  assert.equal(voices.edge['hi-IN'].gender, 'female');
  assert.ok(voices.edge['en-US']);
  assert.equal(voices.edge['en-US'].gender, 'female');
});
