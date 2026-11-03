var validSquare = function(p1, p2, p3, p4) {
    const dist = (a, b) => {
        return (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]);
    };
    const pts = [p1, p2, p3, p4];
    const map = {};
    for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
            const d = dist(pts[i], pts[j]);
            if (d === 0) return false;
            map[d] = (map[d] || 0) + 1;
        }
    }
    const keys = Object.keys(map).map(Number);
    if (keys.length !== 2) return false;
    keys.sort((a, b) => a - b);
    return map[keys[0]] === 4 && map[keys[1]] === 2;
};
var solve = typeof validSquare !== 'undefined' ? validSquare : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      const results = [];
      for (let i = 0; i < lines.length; i += 4) {
        if (i + 3 < lines.length) {
          const p1 = JSON.parse(lines[i]);
          const p2 = JSON.parse(lines[i+1]);
          const p3 = JSON.parse(lines[i+2]);
          const p4 = JSON.parse(lines[i+3]);
          results.push(JSON.stringify(solve(p1, p2, p3, p4)));
        }
      }
      console.log(results.join('\n'));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
