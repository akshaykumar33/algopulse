var climbStairs = function(n, costs) {
  const dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let j = 1; j <= n; j++) {
    for (let d = 1; d <= 3 && d <= j; d++) {
      const v = dp[j - d] + costs[j - 1] + d * d;
      if (v < dp[j]) dp[j] = v;
    }
  }
  return dp[n];
};
var solve = climbStairs;
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
module.exports = climbStairs;
