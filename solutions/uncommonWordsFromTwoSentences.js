var uncommonFromSentences = function(s1, s2) {
  const cnt = new Map();
  const words = (s1 + ' ' + s2).split(' ');
  for (const w of words) {
    cnt.set(w, (cnt.get(w) || 0) + 1);
  }
  const res = [];
  for (const [w, c] of cnt.entries()) {
    if (c === 1) res.push(w);
  }
  return res;
};

var solve = uncommonFromSentences;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const s1 = JSON.parse(lines[i]);
        const s2 = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(s1, s2)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
