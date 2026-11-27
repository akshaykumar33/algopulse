var constructProductMatrix = function(grid) {
  const n = grid.length;
  const m = grid[0].length;
  const MOD = 12345;
  const total = n * m;
  const flat = new Int32Array(total);
  let idx = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) flat[idx++] = grid[i][j] % MOD;
  }
  const pref = new Int32Array(total);
  pref[0] = flat[0];
  for (let i = 1; i < total; i++) pref[i] = (pref[i - 1] * flat[i]) % MOD;
  const suff = new Int32Array(total);
  suff[total - 1] = flat[total - 1];
  for (let i = total - 2; i >= 0; i--) suff[i] = (suff[i + 1] * flat[i]) % MOD;
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(new Array(m));
    for (let j = 0; j < m; j++) {
      const pos = i * m + j;
      const p = pos > 0 ? pref[pos - 1] : 1;
      const s = pos < total - 1 ? suff[pos + 1] : 1;
      res[i][j] = (p * s) % MOD;
    }
  }
  return res;
};
var solve = constructProductMatrix;
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
module.exports = constructProductMatrix;
