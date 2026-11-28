var minimumCost = function(s) {
  const n = s.length;
  let ans = 0;
  for (let i = 1; i < n; i++) if (s[i] !== s[i - 1]) ans += Math.min(i, n - i);
  return ans;
};
var solve = minimumCost;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = minimumCost;
