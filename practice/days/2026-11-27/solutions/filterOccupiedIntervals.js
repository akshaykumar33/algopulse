var filterIntervals = function(intervals) {
  intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const res = [];
  let maxR = -1;
  for (const [l, r] of intervals) {
    if (r > maxR) {
      res.push([l, r]);
      maxR = r;
    }
  }
  return res;
};
var solve = filterIntervals;
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
module.exports = filterIntervals;
