var lengthOfLongestSubsequence = function(nums, target) {
  const dp = new Int32Array(target + 1).fill(-1);
  dp[0] = 0;
  for (const x of nums) {
    for (let s = target; s >= x; s--) {
      if (dp[s - x] !== -1 && dp[s - x] + 1 > dp[s]) {
        dp[s] = dp[s - x] + 1;
      }
    }
  }
  return dp[target];
};
var solve = lengthOfLongestSubsequence;
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
module.exports = lengthOfLongestSubsequence;
