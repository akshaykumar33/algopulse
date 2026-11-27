var minimumDeletions = function(word, k) {
  const freq = new Int32Array(26);
  for (let i = 0; i < word.length; i++) freq[word.charCodeAt(i) - 97]++;
  const counts = [];
  for (let i = 0; i < 26; i++) if (freq[i] > 0) counts.push(freq[i]);
  counts.sort((a, b) => a - b);
  let ans = word.length;
  for (let i = 0; i < counts.length; i++) {
    const base = counts[i];
    let cur = 0;
    for (let j = 0; j < counts.length; j++) {
      if (counts[j] < base) cur += counts[j];
      else if (counts[j] > base + k) cur += counts[j] - (base + k);
    }
    if (cur < ans) ans = cur;
  }
  return ans;
};
var solve = minimumDeletions;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = minimumDeletions;
