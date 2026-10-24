const localVoice = require('../localVoice');

async function speak(text, lang = 'en-US', mood = '') {
  if (!localVoice.status().available) {
    throw new Error('Local MMS voice server is not running');
  }
  return await localVoice.speak(text, lang, mood);
}

module.exports = {
  speak,
  status: () => localVoice.status(),
};
