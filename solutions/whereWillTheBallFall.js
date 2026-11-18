var findBall = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const ans = new Int32Array(n);

  for (let col = 0; col < n; col++) {
    let c = col;
    for (let r = 0; r < m; r++) {
      const dir = grid[r][c];
      const nc = c + dir;
      if (nc < 0 || nc >= n || grid[r][nc] !== dir) {
        c = -1;
        break;
      }
      c = nc;
    }
    ans[col] = c;
  }

  return Array.from(ans);
};

var solve = findBall;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = findBall;
