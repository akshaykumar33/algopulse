var findTargetSumWays = function(nums, target) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) sum += nums[i];
  if (Math.abs(target) > sum || ((sum + target) & 1) === 1) return 0;
  const p = (sum + target) / 2;
  const dp = new Int32Array(p + 1);
  dp[0] = 1;
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    for (let j = p; j >= num; j--) {
      dp[j] += dp[j - num];
    }
  }
  return dp[p];
};

var solve = typeof findTargetSumWays !== 'undefined' ? findTargetSumWays : null;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
