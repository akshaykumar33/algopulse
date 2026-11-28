var countKthRoots = function(l, r, k) {
  if (k === 1) return r - l + 1;
  let ans = l === 0 ? 1 : 0;
  for (let x = 1; ; x++) {
    let p = 1;
    for (let i = 0; i < k && p <= r; i++) p *= x;
    if (p > r) break;
    if (p >= l) ans++;
  }
  return ans;
};
var solve = countKthRoots;
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
module.exports = countKthRoots;
