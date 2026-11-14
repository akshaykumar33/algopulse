var maxSumDivThree = function(nums) {
  let dp = [0, -1e9, -1e9];
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const next = [dp[0], dp[1], dp[2]];
    for (let r = 0; r < 3; r++) {
      if (dp[r] >= 0) {
        const nr = (r + x) % 3;
        if (dp[r] + x > next[nr]) next[nr] = dp[r] + x;
      }
    }
    dp = next;
  }
  return dp[0];
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(maxSumDivThree(JSON.parse(l))));
  }
}

module.exports = maxSumDivThree;
