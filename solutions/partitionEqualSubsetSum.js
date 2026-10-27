var partitionEqualSubsetSum = function(nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }
    if (sum % 2 !== 0) return false;
    let target = sum / 2;
    let dp = new Uint8Array(target + 1);
    dp[0] = 1;
    for (let i = 0; i < nums.length; i++) {
        let val = nums[i];
        for (let j = target; j >= val; j--) {
            if (dp[j - val]) {
                dp[j] = 1;
            }
        }
    }
    return dp[target] === 1;
};
var solve = partitionEqualSubsetSum;

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
