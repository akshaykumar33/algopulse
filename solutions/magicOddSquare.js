const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const m = (n - 1) / 2;
  const grid = Array.from({ length: n }, () => new Int32Array(n));
  let odd = 1;
  let even = 2;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (Math.abs(r - m) + Math.abs(c - m) <= m) {
        grid[r][c] = odd;
        odd += 2;
      } else {
        grid[r][c] = even;
        even += 2;
      }
    }
  }

  const out = [];
  for (let r = 0; r < n; r++) {
    out.push(grid[r].join(' '));
  }
  console.log(out.join('\n'));
}

solve();
