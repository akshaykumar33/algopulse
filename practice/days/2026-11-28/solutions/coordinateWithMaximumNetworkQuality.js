var bestCoordinate = function(towers, radius) {
  let best = -1, ans = [0, 0];
  for (let x = 0; x <= 50; x++) {
    for (let y = 0; y <= 50; y++) {
      let q = 0;
      for (const [tx, ty, tq] of towers) {
        const d2 = (tx - x) * (tx - x) + (ty - y) * (ty - y);
        if (d2 <= radius * radius) q += Math.floor(tq / (1 + Math.sqrt(d2)));
      }
      if (q > best) { best = q; ans = [x, y]; }
    }
  }
  return ans;
};
var solve = bestCoordinate;
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
module.exports = bestCoordinate;
