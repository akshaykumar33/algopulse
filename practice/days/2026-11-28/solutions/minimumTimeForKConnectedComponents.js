var minTime = function(n, edges, k) {
  const par = new Int32Array(n);
  for (let i = 0; i < n; i++) par[i] = i;
  const find = (x) => {
    while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; }
    return x;
  };
  const e = edges.slice().sort((a, b) => b[2] - a[2]);
  let comp = n;
  for (const [u, v, t] of e) {
    const a = find(u), b = find(v);
    if (a === b) continue;
    if (comp - 1 < k) return t;
    par[a] = b;
    comp--;
  }
  return 0;
};
var solve = minTime;
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
module.exports = minTime;
