var minimumLength = function(s) {
  const count = new Int32Array(26);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
  }
  let ans = 0;
  for (let i = 0; i < 26; i++) {
    if (count[i] > 0) {
      ans += (count[i] % 2 === 1 ? 1 : 2);
    }
  }
  return ans;
};
var solve = minimumLength;
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
module.exports = minimumLength;