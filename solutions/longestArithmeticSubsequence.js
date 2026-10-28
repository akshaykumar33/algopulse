var longestArithSeqLength = function(nums) {
  const n = nums.length;
  const dp = Array.from({ length: n }, () => new Int16Array(1001).fill(1));
  let maxLen = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const diff = nums[i] - nums[j] + 500;
      const len = dp[j][diff] + 1;
      if (len > dp[i][diff]) dp[i][diff] = len;
      if (dp[i][diff] > maxLen) maxLen = dp[i][diff];
    }
  }

  return maxLen;
};

var solve = function(nums) {
  return longestArithSeqLength(nums);
};

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

