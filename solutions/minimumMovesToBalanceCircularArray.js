var minMoves = function(nums) {
  const n = nums.length;
  let total = 0;
  for (const x of nums) total += x;
  if (total % n !== 0) return -1;
  const target = total / n;
  let ans = 0;
  let cur = 0;
  for (let i = 0; i < n; i++) {
    cur += nums[i] - target;
    ans += Math.abs(cur);
  }
  return ans;
};
var solve = minMoves;
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
module.exports = minMoves;
