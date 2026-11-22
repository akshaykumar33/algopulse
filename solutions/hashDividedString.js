var stringHash = function(s, k) {
  let ans = '';
  const n = s.length;
  for (let i = 0; i < n; i += k) {
    let sum = 0;
    for (let j = 0; j < k; j++) {
      sum += (s.charCodeAt(i + j) - 97);
    }
    ans += String.fromCharCode(97 + (sum % 26));
  }
  return ans;
};
var solve = stringHash;
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
module.exports = stringHash;