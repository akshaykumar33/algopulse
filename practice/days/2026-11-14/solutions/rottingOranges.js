var orangesRotting = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const queue = [];
  let fresh = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) queue.push([r, c, 0]);
      else if (grid[r][c] === 1) fresh++;
    }
  }

  let head = 0;
  let maxTime = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (head < queue.length) {
    const [r, c, t] = queue[head++];
    if (t > maxTime) maxTime = t;

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
        grid[nr][nc] = 2;
        fresh--;
        queue.push([nr, nc, t + 1]);
      }
    }
  }

  return fresh === 0 ? maxTime : -1;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(orangesRotting(JSON.parse(l))));
  }
}

module.exports = orangesRotting;
