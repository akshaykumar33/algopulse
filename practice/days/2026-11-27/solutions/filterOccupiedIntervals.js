var filterOccupiedIntervals = function(occupiedIntervals, freeStart, freeEnd) {
  const a = occupiedIntervals.map(x => [x[0], x[1]]).sort((x, y) => x[0] - y[0]);
  const merged = [];
  for (const [l, r] of a) {
    if (merged.length && l <= merged[merged.length - 1][1] + 1) {
      if (r > merged[merged.length - 1][1]) merged[merged.length - 1][1] = r;
    } else merged.push([l, r]);
  }
  const res = [];
  for (const [l, r] of merged) {
    if (r < freeStart || l > freeEnd) { res.push([l, r]); continue; }
    if (l < freeStart) res.push([l, freeStart - 1]);
    if (r > freeEnd) res.push([freeEnd + 1, r]);
  }
  return res;
};
var solve = filterOccupiedIntervals;
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
module.exports = filterOccupiedIntervals;
