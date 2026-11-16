var largest1BorderedSquare = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const left = Array.from({ length: m }, () => new Int32Array(n));
  const top = Array.from({ length: m }, () => new Int32Array(n));

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        left[r][c] = c === 0 ? 1 : left[r][c - 1] + 1;
        top[r][c] = r === 0 ? 1 : top[r - 1][c] + 1;
      }
    }
  }

  let maxSide = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const limit = Math.min(left[r][c], top[r][c]);
      for (let len = limit; len > maxSide; len--) {
        if (top[r][c - len + 1] >= len && left[r - len + 1][c] >= len) {
          maxSide = len;
          break;
        }
      }
    }
  }
  return maxSide * maxSide;
};

var solve = largest1BorderedSquare;

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
