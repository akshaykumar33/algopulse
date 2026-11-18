var maxMoves = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  let reach = new Uint8Array(m).fill(1);
  let maxCol = 0;

  for (let c = 0; c < n - 1; c++) {
    const nextReach = new Uint8Array(m);
    let hasAny = false;
    for (let r = 0; r < m; r++) {
      if (!reach[r]) continue;
      const v = grid[r][c];
      for (const nr of [r - 1, r, r + 1]) {
        if (nr >= 0 && nr < m && grid[nr][c + 1] > v) {
          nextReach[nr] = 1;
          hasAny = true;
        }
      }
    }
    if (!hasAny) break;
    reach = nextReach;
    maxCol = c + 1;
  }

  return maxCol;
};

var solve = maxMoves;

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

module.exports = maxMoves;
