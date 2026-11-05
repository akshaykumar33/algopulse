const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const matrix = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push(parseInt(tokens[ptr++], 10));
      }
      matrix.push(row);
    }
    let ans = 0;
    let transposed = false;
    for (let i = n - 1; i >= 1; i--) {
      const expected = (transposed ? 1 : i + 1);
      const actual = matrix[0][i] / (i + 1);
      if (Math.abs(actual - expected) < 1e-9) {
        ans++;
        transposed = !transposed;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
