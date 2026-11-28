var minMoves = function(balance) {
  const n = balance.length;
  let p = -1, sum = 0;
  for (let i = 0; i < n; i++) {
    sum += balance[i];
    if (balance[i] < 0) p = i;
  }
  if (p === -1) return 0;
  if (sum < 0) return -1;
  let need = -balance[p], ans = 0;
  for (let d = 1; need > 0; d++) {
    const l = ((p - d) % n + n) % n, r = (p + d) % n;
    let avail = balance[l];
    if (r !== l) avail += balance[r];
    const take = Math.min(avail, need);
    ans += take * d;
    need -= take;
  }
  return ans;
};
var solve = minMoves;
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
module.exports = minMoves;
