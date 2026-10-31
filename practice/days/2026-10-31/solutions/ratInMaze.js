const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const grid = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push(parseInt(tokens[ptr++], 10));
      }
      grid.push(row);
    }

    if (grid[0][0] === 0 || grid[n - 1][n - 1] === 0) {
      out.push('NO');
      continue;
    }

    const dist = Array.from({ length: n }, () => new Array(n).fill(-1));
    const q = [[0, 0]];
    dist[0][0] = 1;
    let head = 0;
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    while (head < q.length) {
      const [r, c] = q[head++];
      if (r === n - 1 && c === n - 1) break;
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1 && dist[nr][nc] === -1) {
          dist[nr][nc] = dist[r][c] + 1;
          q.push([nr, nc]);
        }
      }
    }

    if (dist[n - 1][n - 1] !== -1) {
      out.push(`YES\n${dist[n - 1][n - 1]}`);
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();

