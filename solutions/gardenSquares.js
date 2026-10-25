const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let n = parseInt(input[ptr++], 10);
    let m = parseInt(input[ptr++], 10);
    let grid = [];
    for (let i = 0; i < n; i++) {
      grid.push(input[ptr++]);
    }
    let count = 0;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        let ch = grid[r][c];
        let maxK = Math.min(n - 1 - r, m - 1 - c);
        for (let k = 1; k <= maxK; k++) {
          if (
            grid[r + k][c] === ch &&
            grid[r][c + k] === ch &&
            grid[r + k][c + k] === ch
          ) {
            count++;
          }
        }
      }
    }
    out.push(count);
  }
  console.log(out.join('\n'));
}

solve();
