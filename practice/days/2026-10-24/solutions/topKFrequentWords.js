var topKFrequent = function(words, k) {
  let freq = {};
  for (let w of words) {
    freq[w] = (freq[w] || 0) + 1;
  }
  let arr = Object.keys(freq);
  arr.sort((a, b) => {
    if (freq[b] !== freq[a]) {
      return freq[b] - freq[a];
    }
    return a.localeCompare(b);
  });
  return arr.slice(0, k);
};

var solve = function(words, k) {
  return topKFrequent(words, k);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const words = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        const result = solve(words, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
