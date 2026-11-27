var minIncrements = function(n, cost) {
  let ans = 0;
  for (let i = Math.floor(n / 2); i >= 1; i--) {
    const l = 2 * i - 1;
    const r = 2 * i;
    ans += Math.abs(cost[l] - cost[r]);
    cost[i - 1] += Math.max(cost[l], cost[r]);
  }
  return ans;
};
var solve = minIncrements;
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
module.exports = minIncrements;
