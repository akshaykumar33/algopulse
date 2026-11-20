var findSafeWalk = function(grid, health) {
  const m = grid.length, n = grid[0].length;
  const dist = Array.from({ length: m }, () => new Int32Array(n).fill(1e9));
  dist[0][0] = grid[0][0];

  const deque = [[0, 0]];
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  while (deque.length > 0) {
    const [r, c] = deque.shift();
    const d = dist[r][c];
    if (r === m - 1 && c === n - 1) break;

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
        const w = grid[nr][nc];
        if (d + w < dist[nr][nc]) {
          dist[nr][nc] = d + w;
          if (w === 0) deque.unshift([nr, nc]);
          else deque.push([nr, nc]);
        }
      }
    }
  }

  return dist[m - 1][n - 1] < health;
};

var solve = findSafeWalk;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = findSafeWalk;