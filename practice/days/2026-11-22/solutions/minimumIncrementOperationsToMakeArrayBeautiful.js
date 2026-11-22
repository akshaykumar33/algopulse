var minIncrementOperations = function(nums, k) {
  const n = nums.length;
  let dp0 = Math.max(0, k - nums[0]);
  let dp1 = Math.max(0, k - nums[1]);
  let dp2 = Math.max(0, k - nums[2]);
  for (let i = 3; i < n; i++) {
    const cost = Math.max(0, k - nums[i]);
    const next = cost + Math.min(dp0, dp1, dp2);
    dp0 = dp1;
    dp1 = dp2;
    dp2 = next;
  }
  return Math.min(dp0, dp1, dp2);
};
var solve = minIncrementOperations;
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
module.exports = minIncrementOperations;