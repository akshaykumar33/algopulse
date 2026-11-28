var minCost = function(n, edges, k) {
  if (n <= k) return 0;
  edges.sort((a, b) => a[2] - b[2]);
  const par = new Int32Array(n);
  for (let i = 0; i < n; i++) par[i] = i;
  const find = x => { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; };
  let comp = n;
  for (const [u, v, w] of edges) {
    const a = find(u), b = find(v);
    if (a === b) continue;
    par[a] = b;
    if (--comp <= k) return w;
  }
  return 0;
};
var solve = minCost;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = minCost;
