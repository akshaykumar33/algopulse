var minEnergy = function(n, brightness, intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let tot = 0, s = 0, e = -1;
  for (const [l, r] of intervals) {
    if (l > e) { tot += e - s + 1; s = l; e = r; }
    else if (r > e) e = r;
  }
  tot += e - s + 1;
  return Math.ceil(brightness / 3) * tot;
};
var solve = minEnergy;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = minEnergy;
