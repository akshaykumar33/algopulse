const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  const grid = [];
  for (let i = 0; i < n; i++) grid.push(input[2 + i]);

  const vis = Array.from({ length: n }, () => new Uint8Array(m));
  let hasCycle = false;
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  function dfs(x, y, px, py, color) {
    vis[x][y] = 1;
    for (let d = 0; d < 4; d++) {
      const nx = x + dx[d];
      const ny = y + dy[d];
      if (nx >= 0 && nx < n && ny >= 0 && ny < m && grid[nx][ny] === color) {
        if (nx === px && ny === py) continue;
        if (vis[nx][ny]) {
          hasCycle = true;
          return;
        }
        dfs(nx, ny, x, y, color);
        if (hasCycle) return;
      }
    }
  }

  for (let i = 0; i < n && !hasCycle; i++) {
    for (let j = 0; j < m && !hasCycle; j++) {
      if (!vis[i][j]) {
        dfs(i, j, -1, -1, grid[i][j]);
      }
    }
  }

  console.log(hasCycle ? 'Yes' : 'No');
}

solve();
