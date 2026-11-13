var validPartition = function(nums) {
  const n = nums.length;
  const dp = new Uint8Array(n + 1);
  dp[0] = 1;

  for (let i = 2; i <= n; i++) {
    if (dp[i - 2] && nums[i - 1] === nums[i - 2]) {
      dp[i] = 1;
    }
    if (i >= 3 && dp[i - 3]) {
      if (nums[i - 1] === nums[i - 2] && nums[i - 2] === nums[i - 3]) {
        dp[i] = 1;
      } else if (nums[i - 1] === nums[i - 2] + 1 && nums[i - 2] === nums[i - 3] + 1) {
        dp[i] = 1;
      }
    }
  }

  return dp[n] === 1;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(validPartition(JSON.parse(line))));
    }
  }
}

module.exports = validPartition;
