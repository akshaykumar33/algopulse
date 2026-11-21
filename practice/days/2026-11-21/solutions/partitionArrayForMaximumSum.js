var maxSumAfterPartitioning = function(arr, k) {
  const n = arr.length;
  const dp = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    let curMax = 0;
    for (let j = 1; j <= k && i - j >= 0; j++) {
      curMax = Math.max(curMax, arr[i - j]);
      dp[i] = Math.max(dp[i], dp[i - j] + curMax * j);
    }
  }
  return dp[n];
};

var solve = maxSumAfterPartitioning;

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

module.exports = maxSumAfterPartitioning;