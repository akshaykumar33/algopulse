const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    for (let r = 0; r < n; r++) {
      const row = new Array(n);
      for (let c = 0; c < n; c++) {
        if (n % 2 === 0) {
          row[c] = -1;
        } else {
          row[c] = (r === c) ? 1 : -1;
        }
      }
      out.push(row.join(' '));
    }
  }
  console.log(out.join('\n'));
}

solve();
