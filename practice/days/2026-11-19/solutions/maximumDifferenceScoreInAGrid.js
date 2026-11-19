var maxScore = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  let ans = -Infinity;
  const minPrev = new Array(m);
  for (let r = 0; r < m; r++) {
    minPrev[r] = new Int32Array(n);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      let prevMin = Infinity;
      if (r > 0) prevMin = Math.min(prevMin, minPrev[r - 1][c]);
      if (c > 0) prevMin = Math.min(prevMin, minPrev[r][c - 1]);

      if (prevMin !== Infinity) {
        const diff = grid[r][c] - prevMin;
        if (diff > ans) ans = diff;
      }
      minPrev[r][c] = Math.min(grid[r][c], prevMin);
    }
  }

  return ans;
};

var solve = maxScore;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      const arg = Array.isArray(parsed) && parsed.length === 1 ? parsed[0] : parsed;
      console.log(JSON.stringify(solve(arg)));
    }
  } catch (e) {}
}

module.exports = maxScore;
