var wordSubsets = function(words1, words2) {
  let maxB = new Int32Array(26);
  for (let w of words2) {
    let freq = new Int32Array(26);
    for (let i = 0; i < w.length; i++) {
      freq[w.charCodeAt(i) - 97]++;
    }
    for (let c = 0; c < 26; c++) {
      if (freq[c] > maxB[c]) maxB[c] = freq[c];
    }
  }

  let res = [];
  for (let w of words1) {
    let freq = new Int32Array(26);
    for (let i = 0; i < w.length; i++) {
      freq[w.charCodeAt(i) - 97]++;
    }
    let ok = true;
    for (let c = 0; c < 26; c++) {
      if (freq[c] < maxB[c]) {
        ok = false;
        break;
      }
    }
    if (ok) res.push(w);
  }
  return res;
};

var solve = wordSubsets;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const words1 = JSON.parse(lines[i]);
        const words2 = JSON.parse(lines[i + 1]);
        const result = solve(words1, words2);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = wordSubsets;
