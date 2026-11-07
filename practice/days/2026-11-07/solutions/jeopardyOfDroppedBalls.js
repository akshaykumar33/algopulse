const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);

  const grid = Array.from({ length: n }, () => new Int32Array(m));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      grid[r][c] = parseInt(tokens[ptr++], 10);
    }
  }

  const out = [];
  for (let b = 0; b < k; b++) {
    let c = parseInt(tokens[ptr++], 10) - 1;
    let r = 0;

    while (r < n) {
      const type = grid[r][c];
      grid[r][c] = 2;
      if (type === 1) {
        c++;
      } else if (type === 2) {
        r++;
      } else if (type === 3) {
        c--;
      }
    }

    out.push(c + 1);
  }

  console.log(out.join(' '));
}

solve();
