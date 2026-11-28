var maximumSaleItems = function(items, budget) {
  const n = items.length;
  const dp = new Array(budget + 1).fill(-Infinity);
  dp[0] = 0;
  let mn = Infinity;
  for (let i = 0; i < n; i++) {
    const [f, p] = items[i];
    if (p < mn) mn = p;
    let deg = 0;
    for (let j = 0; j < n; j++) if (j !== i && items[j][0] % f === 0) deg++;
    const v = 1 + deg;
    for (let c = budget; c >= p; c--) if (dp[c - p] + v > dp[c]) dp[c] = dp[c - p] + v;
  }
  let ans = 0;
  for (let c = 0; c <= budget; c++) {
    if (dp[c] < 0) continue;
    const cur = dp[c] + Math.floor((budget - c) / mn);
    if (cur > ans) ans = cur;
  }
  return ans;
};
var solve = maximumSaleItems;
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
module.exports = maximumSaleItems;
