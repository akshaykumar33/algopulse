var specialGrid = function(n) {
  const sz = 1 << n;
  const g = Array.from({ length: sz }, () => new Array(sz).fill(0));
  const fill = (r, c, len, base) => {
    if (len === 1) { g[r][c] = base; return; }
    const h = len >> 1, q = h * h;
    fill(r, c + h, h, base);
    fill(r + h, c + h, h, base + q);
    fill(r + h, c, h, base + 2 * q);
    fill(r, c, h, base + 3 * q);
  };
  fill(0, 0, sz, 0);
  return g;
};
var solve = specialGrid;
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
module.exports = specialGrid;
