var solve = function(sentence) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  const words = sentence.split(' ');
  const res = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    let converted;
    if (vowels.has(w[0])) {
      converted = w + 'ma';
    } else {
      converted = w.slice(1) + w[0] + 'ma';
    }
    converted += 'a'.repeat(i + 1);
    res.push(converted);
  }

  return res.join(' ');
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const sentence = JSON.parse(lines[i]);
        const res = solve(sentence);
        console.log(JSON.stringify(res));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
