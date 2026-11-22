var maxPalindromesAfterOperations = function(words) {
  const count = new Int32Array(26);
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    for (let j = 0; j < w.length; j++) count[w.charCodeAt(j) - 97]++;
  }
  let pairs = 0;
  for (let i = 0; i < 26; i++) pairs += Math.floor(count[i] / 2);
  const lens = words.map(w => w.length).sort((a, b) => a - b);
  let ans = 0;
  for (let i = 0; i < lens.length; i++) {
    const needed = Math.floor(lens[i] / 2);
    if (pairs >= needed) {
      pairs -= needed;
      ans++;
    } else {
      break;
    }
  }
  return ans;
};
var solve = maxPalindromesAfterOperations;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0])));
    }
  } catch (e) {}
}
module.exports = maxPalindromesAfterOperations;