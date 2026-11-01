const findMinArrowShots = function(points) {
  if (points.length === 0) return 0;
  points.sort((a, b) => a[1] - b[1]);
  let arrows = 1;
  let curEnd = points[0][1];
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > curEnd) {
      arrows++;
      curEnd = points[i][1];
    }
  }
  return arrows;
};

var solve = typeof findMinArrowShots !== 'undefined' ? findMinArrowShots : null;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch (e) {}
      }
    }
  } catch (err) {}
}

module.exports = solve;
