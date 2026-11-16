var colorBorder = function(grid, row, col, color) {
  const m = grid.length;
  const n = grid[0].length;
  const orig = grid[row][col];
  if (orig === color) return grid;

  const vis = Array.from({ length: m }, () => new Uint8Array(n));
  const borders = [];

  function dfs(r, c) {
    vis[r][c] = 1;
    let isBorder = false;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= m || nc < 0 || nc >= n || (!vis[nr][nc] && grid[nr][nc] !== orig)) {
        isBorder = true;
      } else if (!vis[nr][nc] && grid[nr][nc] === orig) {
        dfs(nr, nc);
      }
    }
    if (isBorder) borders.push([r, c]);
  }

  dfs(row, col);
  for (const [r, c] of borders) {
    grid[r][c] = color;
  }
  return grid;
};

var solve = colorBorder;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(...parsed)));
    }
  } catch (e) {}
}
