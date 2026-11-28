var maxTotal = function(value, limit) {
  const n = value.length;
  const groups = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < n; i++) groups[limit[i]].push(value[i]);
  let ans = 0;
  for (let l = 1; l <= n; l++) {
    const g = groups[l];
    if (!g.length) continue;
    g.sort((a, b) => b - a);
    for (let i = 0; i < Math.min(l, g.length); i++) ans += g[i];
  }
  return ans;
};
var solve = maxTotal;
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
module.exports = maxTotal;
