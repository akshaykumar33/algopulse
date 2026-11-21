var regionsBySlashes = function(grid) {
  const n = grid.length;
  const size = 3 * n;
  const g = Array.from({ length: size }, () => new Uint8Array(size));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const ch = grid[r][c];
      if (ch === '/') {
        g[3 * r][3 * c + 2] = 1;
        g[3 * r + 1][3 * c + 1] = 1;
        g[3 * r + 2][3 * c] = 1;
      } else if (ch === '\\') {
        g[3 * r][3 * c] = 1;
        g[3 * r + 1][3 * c + 1] = 1;
        g[3 * r + 2][3 * c + 2] = 1;
      }
    }
  }
  let regions = 0;
  function dfs(r, c) {
    if (r < 0 || r >= size || c < 0 || c >= size || g[r][c] === 1) return;
    g[r][c] = 1;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (g[r][c] === 0) {
        regions++;
        dfs(r, c);
      }
    }
  }
  return regions;
};

var solve = regionsBySlashes;

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

module.exports = regionsBySlashes;