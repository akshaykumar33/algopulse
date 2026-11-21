var new21Game = function(n, k, maxPts) {
  if (k === 0 || n >= k + maxPts) return 1.0;
  const dp = new Float64Array(n + 1);
  dp[0] = 1.0;
  let windowSum = 1.0;
  let ans = 0.0;
  for (let i = 1; i <= n; i++) {
    dp[i] = windowSum / maxPts;
    if (i < k) windowSum += dp[i];
    else ans += dp[i];
    if (i >= maxPts) windowSum -= dp[i - maxPts];
  }
  return Number(ans.toFixed(5));
};

var solve = new21Game;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2])));
    }
  } catch (e) {}
}

module.exports = new21Game;