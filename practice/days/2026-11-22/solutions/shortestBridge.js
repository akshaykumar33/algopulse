var shortestBridge = function(grid) {
  const n = grid.length;
  const queue = [];
  let found = false;
  function dfs(r, c) {
    if (r < 0 || r >= n || c < 0 || c >= n || grid[r][c] !== 1) return;
    grid[r][c] = 2;
    queue.push([r, c, 0]);
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        dfs(r, c);
        found = true;
        break;
      }
    }
    if (found) break;
  }
  let head = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (head < queue.length) {
    const [r, c, d] = queue[head++];
    for (let i = 0; i < 4; i++) {
      const nr = r + dirs[i][0], nc = c + dirs[i][1];
      if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
        if (grid[nr][nc] === 1) return d;
        if (grid[nr][nc] === 0) {
          grid[nr][nc] = 2;
          queue.push([nr, nc, d + 1]);
        }
      }
    }
  }
  return 0;
};
var solve = shortestBridge;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0])));
    }
  } catch (e) {}
}
module.exports = shortestBridge;