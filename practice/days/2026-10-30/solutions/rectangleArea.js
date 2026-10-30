var computeArea = function(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  const area1 = (ax2 - ax1) * (ay2 - ay1);
  const area2 = (bx2 - bx1) * (by2 - by1);
  const overlapW = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));
  const overlapH = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));
  return area1 + area2 - overlapW * overlapH;
};

var solve = function(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  return computeArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      const args = lines.map(l => JSON.parse(l));
      console.log(JSON.stringify(solve(...args)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
