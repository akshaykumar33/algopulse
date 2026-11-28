var minMovesToCaptureTheQueen = function(a, b, c, d, e, f) {
  const between = (x1, y1, x2, y2, px, py) => {
    const dx = Math.sign(x2 - x1), dy = Math.sign(y2 - y1);
    let x = x1 + dx, y = y1 + dy;
    while (x !== x2 || y !== y2) {
      if (x === px && y === py) return true;
      x += dx;
      y += dy;
    }
    return false;
  };
  if ((a === e || b === f) && !between(a, b, e, f, c, d)) return 1;
  if (Math.abs(c - e) === Math.abs(d - f) && !between(c, d, e, f, a, b)) return 1;
  return 2;
};
var solve = minMovesToCaptureTheQueen;
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
module.exports = minMovesToCaptureTheQueen;
