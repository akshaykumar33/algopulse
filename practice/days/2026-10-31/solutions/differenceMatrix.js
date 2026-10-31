const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let low = 1, high = n * n;
    let turn = true;

    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        if (turn) {
          row.push(low++);
        } else {
          row.push(high--);
        }
        turn = !turn;
      }
      out.push(row.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();

