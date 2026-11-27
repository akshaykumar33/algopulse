var minCost = function(costs) {
  let ans = 0;
  for (let i = 1; i < costs.length; i++) ans += Math.abs(costs[i] - costs[i - 1]);
  return ans;
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
