var minCost = function(m, n, waitCost) {
  const dp = new Array(n).fill(Infinity);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) { dp[0] = 1; continue; }
      const best = Math.min(dp[j], j > 0 ? dp[j - 1] : Infinity);
      dp[j] = best + (i + 1) * (j + 1) + ((i === m - 1 && j === n - 1) ? 0 : waitCost[i][j]);
    }
  }
  return dp[n - 1];
};
var solve = minCost;
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
module.exports = minCost;
