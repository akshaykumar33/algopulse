var minOperations = function(nums) {
  let ans = 0, mx = 0;
  for (let x of nums) {
    let b = 0;
    while (x > 0) {
      ans += x & 1;
      x >>>= 1;
      b++;
    }
    if (b > mx) mx = b;
  }
  return ans + Math.max(0, mx - 1);
};
var solve = minOperations;
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
module.exports = minOperations;
