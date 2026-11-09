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

    if (n <= m) {
      for (let i = 0; i < n; i++) {
        const row = [];
        const factor = 2 * i + 1;
        for (let j = 0; j < m; j++) {
          row.push(factor * (j + 1));
        }
        out.push(row.join(' '));
      }
    } else {
      for (let i = 0; i < n; i++) {
        const row = [];
        const factor = i + 1;
        for (let j = 0; j < m; j++) {
          row.push(factor * (2 * j + 1));
        }
        out.push(row.join(' '));
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
