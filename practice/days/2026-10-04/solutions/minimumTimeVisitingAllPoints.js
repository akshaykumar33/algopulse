var minTimeToVisitAllPoints = function(points) {
  let ans = 0;
  for (let i = 0; i < points.length - 1; i++) {
    let x1 = points[i][0], y1 = points[i][1];
    let x2 = points[i+1][0], y2 = points[i+1][1];
    ans += Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  }
  return ans;
};

var solve = minTimeToVisitAllPoints;

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
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
