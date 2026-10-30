const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const grid = [];
    for (let i = 0; i < n; i++) {
      grid.push(tokens[ptr++]);
    }

    if (grid[0][0] === '1') {
      out.push('-1');
      continue;
    }

    const ops = [];
    for (let r = n - 1; r >= 0; r--) {
      for (let c = m - 1; c >= 0; c--) {
        if (grid[r][c] === '1') {
          if (c > 0) {
            ops.push((r + 1) + ' ' + c + ' ' + (r + 1) + ' ' + (c + 1));
          } else {
            ops.push(r + ' ' + (c + 1) + ' ' + (r + 1) + ' ' + (c + 1));
          }
        }
      }
    }

    out.push(ops.length);
    for (const op of ops) out.push(op);
  }
  console.log(out.join('\n'));
}

solve();
