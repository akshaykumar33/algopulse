var maxGoodNumber = function(nums) {
  const b = nums.map(x => x.toString(2));
  const p = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
  let ans = 0;
  for (const [i, j, k] of p) ans = Math.max(ans, parseInt(b[i] + b[j] + b[k], 2));
  return ans;
};
var solve = maxGoodNumber;
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
module.exports = maxGoodNumber;
