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

    const mat = Array.from({ length: n }, () => new Uint8Array(m).fill(2));

    if (n <= m) {
      for (let c = 0; c < m; c++) {
        mat[c % n][c] = 3;
      }
    } else {
      for (let r = 0; r < n; r++) {
        mat[r][r % m] = 3;
      }
    }

    for (let r = 0; r < n; r++) {
      out.push(mat[r].join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
