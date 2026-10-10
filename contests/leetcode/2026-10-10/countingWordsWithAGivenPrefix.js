var prefixCount = function(words, pref) {
  let cnt = 0;
  for (const w of words) {
    if (w.startsWith(pref)) {
      cnt++;
    }
  }
  return cnt;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        try {
          const words = JSON.parse(lines[i]);
          const pref = JSON.parse(lines[i+1]);
          const result = prefixCount(words, pref);
          console.log(JSON.stringify(result));
        } catch (err) {
          console.error('Runner error:', err.message);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = prefixCount;
