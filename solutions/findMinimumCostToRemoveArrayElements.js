var minCost = function(nums) {
  const n = nums.length;
  const memo = new Map();
  function dp(prev, i) {
    if (i >= n) return nums[prev];
    if (i === n - 1) return Math.max(nums[prev], nums[i]);
    const key = prev * (n + 2) + i;
    if (memo.has(key)) return memo.get(key);
    const a = nums[prev], b = nums[i], c = nums[i + 1];
    const op1 = Math.max(a, b) + dp(i + 1, i + 2);
    const op2 = Math.max(a, c) + dp(i, i + 2);
    const op3 = Math.max(b, c) + dp(prev, i + 2);
    const res = Math.min(op1, op2, op3);
    memo.set(key, res);
    return res;
  }
  if (n <= 2) {
    let m = nums[0];
    for (let i = 1; i < n; i++) m = Math.max(m, nums[i]);
    return m;
  }
  return dp(0, 1);
};
var solve = minCost;
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
module.exports = minCost;