const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const grid = [];
    for (let r = 0; r < n; r++) {
      grid.push(input[ptr++].split(''));
    }

    for (let c = 0; c < m; c++) {
      let lowest = n - 1;
      for (let r = n - 1; r >= 0; r--) {
        if (grid[r][c] === 'o') {
          lowest = r - 1;
        } else if (grid[r][c] === '*') {
          grid[r][c] = '.';
          grid[lowest][c] = '*';
          lowest--;
        }
      }
    }

    for (let r = 0; r < n; r++) {
      out.push(grid[r].join(''));
    }
  }

  console.log(out.join('\n'));
}

solve();
