var answerString = function(word, numFriends) {
  if (numFriends === 1) return word;
  const n = word.length, len = n - numFriends + 1;
  let ans = '';
  for (let i = 0; i < n; i++) {
    const cur = word.substring(i, i + len);
    if (cur > ans) ans = cur;
  }
  return ans;
};
var solve = answerString;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = answerString;
