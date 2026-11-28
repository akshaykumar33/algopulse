var generateSchedule = function(n) {
  if (n < 5) return [];
  const tot = n * (n - 1);
  const used = [];
  for (let i = 0; i < n; i++) used.push(new Uint8Array(n));
  const rem = new Int32Array(n).fill(2 * (n - 1));
  const lastDay = new Int32Array(n).fill(-5);
  const ans = [];
  let pu = -1, pv = -1;
  for (let day = 0; day < tot; day++) {
    let bu = -1, bv = -1, bs = -Infinity;
    for (let u = 0; u < n; u++) {
      if (u === pu || u === pv) continue;
      for (let v = 0; v < n; v++) {
        if (v === u || v === pu || v === pv || used[u][v]) continue;
        const sc = (rem[u] + rem[v]) * 4096 - lastDay[u] - lastDay[v];
        if (sc > bs) { bs = sc; bu = u; bv = v; }
      }
    }
    if (bu < 0) return [];
    used[bu][bv] = 1;
    rem[bu]--; rem[bv]--;
    lastDay[bu] = lastDay[bv] = day;
    ans.push([bu, bv]);
    pu = bu; pv = bv;
  }
  return ans;
};
var solve = generateSchedule;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = generateSchedule;
