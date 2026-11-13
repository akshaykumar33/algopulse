const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines || lines.length === 0 || lines[0] === '') return;
  const [n, m] = lines[0].trim().split(/\s+/).map(Number);
  const grid = [];
  for (let i = 1; i <= n; i++) {
    grid.push(lines[i].trim());
  }

  const pref = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      pref[i + 1][j + 1] = (grid[i][j] === '1' ? 1 : 0) +
        pref[i][j + 1] + pref[i + 1][j] - pref[i][j];
    }
  }

  let maxPerimeter = 0;
  for (let r1 = 1; r1 <= n; r1++) {
    for (let c1 = 1; c1 <= m; c1++) {
      for (let r2 = r1; r2 <= n; r2++) {
        for (let c2 = c1; c2 <= m; c2++) {
          const ones = pref[r2][c2] - pref[r1 - 1][c2] - pref[r2][c1 - 1] + pref[r1 - 1][c1 - 1];
          if (ones === 0) {
            const p = 2 * ((r2 - r1 + 1) + (c2 - c1 + 1));
            if (p > maxPerimeter) {
              maxPerimeter = p;
            }
          }
        }
      }
    }
  }

  console.log(maxPerimeter);
}

solve();
