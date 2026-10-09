var mostCommonWord = function(paragraph, banned) {
  let banSet = new Set(banned);
  let words = paragraph.toLowerCase().replace(/[^a-z]/g, ' ').split(/\s+/);
  let cnt = {};
  let maxFreq = 0;
  let ans = '';
  for (let w of words) {
    if (!w || banSet.has(w)) continue;
    cnt[w] = (cnt[w] || 0) + 1;
    if (cnt[w] > maxFreq) {
      maxFreq = cnt[w];
      ans = w;
    }
  }
  return ans;
};
var solve = mostCommonWord;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        let paragraph = JSON.parse(lines[i]);
        let banned = JSON.parse(lines[i+1]);
        let result = solve(paragraph, banned);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
