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
    if (n === 2) {
      out.push('-1');
      continue;
    }
    const g = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let r = 0; r <= n - 3; r++) g[r][0] = 1;
    for (let c = 0; c <= n - 3; c++) g[n - 3][c] = 1;
    g[n - 3][n - 3] = 1;
    g[n - 3][n - 2] = 1;
    g[n - 3][n - 1] = 1;
    g[n - 2][n - 2] = 1;
    g[n - 2][n - 1] = 1;
    g[n - 1][n - 2] = 1;
    g[n - 1][n - 1] = 1;
    for (let r = 0; r < n; r++) {
      out.push(g[r].join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
