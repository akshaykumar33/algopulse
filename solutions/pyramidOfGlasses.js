const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;

  const n = Number(input[0]);
  const t = Number(input[1]);

  const g = Array.from({ length: n + 1 }, () => new Float64Array(n + 1));
  g[1][1] = t;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      if (g[i][j] > 1) {
        const excess = g[i][j] - 1;
        g[i][j] = 1;
        if (i < n) {
          g[i + 1][j] += excess / 2;
          g[i + 1][j + 1] += excess / 2;
        }
      }
    }
  }

  let ans = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      if (g[i][j] >= 1 - 1e-9) ans++;
    }
  }

  console.log(ans);
}

solve();
