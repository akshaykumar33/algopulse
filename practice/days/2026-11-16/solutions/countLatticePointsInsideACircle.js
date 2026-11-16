var countLatticePoints = function(circles) {
  const set = new Set();
  for (const [x, y, r] of circles) {
    const r2 = r * r;
    for (let dx = -r; dx <= r; dx++) {
      const px = x + dx;
      for (let dy = -r; dy <= r; dy++) {
        if (dx * dx + dy * dy <= r2) {
          const py = y + dy;
          set.add(px * 1000 + py);
        }
      }
    }
  }
  return set.size;
};

var solve = countLatticePoints;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}
