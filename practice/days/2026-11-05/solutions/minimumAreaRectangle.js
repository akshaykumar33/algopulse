var minimumAreaRectangle = function(points) {
    const s = new Set();
    for (const [x, y] of points) {
        s.add(x * 40001 + y);
    }
    let minArea = Infinity;
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const [x1, y1] = points[i];
            const [x2, y2] = points[j];
            if (x1 !== x2 && y1 !== y2) {
                if (s.has(x1 * 40001 + y2) && s.has(x2 * 40001 + y1)) {
                    const area = Math.abs(x1 - x2) * Math.abs(y1 - y2);
                    if (area < minArea) {
                        minArea = area;
                    }
                }
            }
        }
    }
    return minArea === Infinity ? 0 : minArea;
};
var solve = typeof minimumAreaRectangle !== 'undefined' ? minimumAreaRectangle : null;

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
