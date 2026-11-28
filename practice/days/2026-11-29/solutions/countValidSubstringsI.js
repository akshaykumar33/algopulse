var countValidSubstrings = function(s) {
  let ans = 0, last = -1;
  for (let r = 0; r < s.length; r++) {
    if (r >= 2 && s[r] === 'c' && s[r - 1] === 'b' && s[r - 2] === 'a') last = r - 2;
    ans += r - last;
  }
  return ans;
};
var solve = countValidSubstrings;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = countValidSubstrings;
