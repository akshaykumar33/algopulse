const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const p = parseInt(tokens[ptr++], 10);
    const m = 2 * n + p;

    let count = 0;
    for (let d = 1; d < n && count < m; d++) {
      for (let i = 1; i <= n && count < m; i++) {
        let j = i + d;
        if (j > n) j -= n;
        if (i < j) {
          out.push(i + ' ' + j);
          count++;
        }
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
