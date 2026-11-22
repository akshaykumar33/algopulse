var closeStrings = function(word1, word2) {
  if (word1.length !== word2.length) return false;
  const c1 = new Int32Array(26), c2 = new Int32Array(26);
  for (let i = 0; i < word1.length; i++) {
    c1[word1.charCodeAt(i) - 97]++;
    c2[word2.charCodeAt(i) - 97]++;
  }
  for (let i = 0; i < 26; i++) {
    if ((c1[i] > 0 && c2[i] === 0) || (c1[i] === 0 && c2[i] > 0)) return false;
  }
  c1.sort();
  c2.sort();
  for (let i = 0; i < 26; i++) {
    if (c1[i] !== c2[i]) return false;
  }
  return true;
};
var solve = closeStrings;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}
module.exports = closeStrings;