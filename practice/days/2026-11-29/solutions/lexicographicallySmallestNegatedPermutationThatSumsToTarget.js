var lexSmallestNegatedPerm = function(n, target) {
  const tot = n * (n + 1) / 2;
  if (target > tot || target < -tot || (tot - target) % 2 !== 0) return [];
  let rem = (tot - target) / 2;
  const neg = new Uint8Array(n + 1);
  for (let i = n; i >= 1 && rem > 0; i--) if (i <= rem) { neg[i] = 1; rem -= i; }
  const ans = [];
  for (let i = n; i >= 1; i--) if (neg[i]) ans.push(-i);
  for (let i = 1; i <= n; i++) if (!neg[i]) ans.push(i);
  return ans;
};
var solve = lexSmallestNegatedPerm;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = lexSmallestNegatedPerm;
