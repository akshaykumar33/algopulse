var countDigitOccurrences = function(nums, digit) {
  let ans = 0;
  for (let x of nums) {
    while (x > 0) {
      if (x % 10 === digit) ans++;
      x = Math.floor(x / 10);
    }
  }
  return ans;
};
var solve = countDigitOccurrences;
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
module.exports = countDigitOccurrences;
