var maxSubsequence = function(s, t) {
  let ans = 0;
  let j = 0;
  for (let i = 0; i < s.length && j < t.length; i++) {
    if (s[i] === t[j]) j++;
  }
  return j;
};
var solve = maxSubsequence;
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
module.exports = maxSubsequence;
