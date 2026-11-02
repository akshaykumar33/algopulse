var deleteAndEarn = function(nums) {
    if (!nums || nums.length === 0) return 0;
    let maxVal = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > maxVal) maxVal = nums[i];
    }
    let sum = new Array(maxVal + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
        sum[nums[i]] += nums[i];
    }
    let dp2 = 0;
    let dp1 = sum[0];
    let maxEarn = Math.max(dp2, dp1);
    for (let i = 1; i <= maxVal; i++) {
        let take = (i >= 2 ? dp2 : 0) + sum[i];
        let skip = dp1;
        let cur = Math.max(take, skip);
        dp2 = dp1;
        dp1 = cur;
        if (cur > maxEarn) maxEarn = cur;
    }
    return maxEarn;
};
var solve = typeof deleteAndEarn !== 'undefined' ? deleteAndEarn : null;

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
