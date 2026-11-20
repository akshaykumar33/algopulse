var longestStrChain = function(words) {
  words.sort((a, b) => a.length - b.length);
  const dp = new Map();
  let maxChain = 1;
  for (const w of words) {
    let cur = 1;
    for (let i = 0; i < w.length; i++) {
      const prev = w.slice(0, i) + w.slice(i + 1);
      if (dp.has(prev)) {
        cur = Math.max(cur, dp.get(prev) + 1);
      }
    }
    dp.set(w, cur);
    maxChain = Math.max(maxChain, cur);
  }
  return maxChain;
};

var solve = longestStrChain;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = longestStrChain;