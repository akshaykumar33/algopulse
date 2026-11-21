const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const grid = new Array(n);
    for (let i = 0; i < n; i++) grid[i] = input[ptr++];

    const covered = Array.from({ length: n }, () => new Uint8Array(m));

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < m - 1; j++) {
        if (
          grid[i][j] === '.' &&
          grid[i + 1][j] === '.' &&
          grid[i][j + 1] === '.' &&
          grid[i + 1][j + 1] === '.'
        ) {
          covered[i][j] = 1;
          covered[i + 1][j] = 1;
          covered[i][j + 1] = 1;
          covered[i + 1][j + 1] = 1;
        }
      }
    }

    let ok = true;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (grid[i][j] === '.' && !covered[i][j]) {
          ok = false;
          break;
        }
      }
      if (!ok) break;
    }
    out.push(ok ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}
solve();