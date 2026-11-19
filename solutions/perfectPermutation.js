const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);

    const P = new Int32Array(n + 1);
    if (k === n) {
      for (let i = 1; i <= n; i++) P[i] = i;
    } else {
      const m = n - k + 1;
      P[1] = m;
      for (let i = 2; i <= m; i++) {
        P[i] = i - 1;
      }
      for (let i = m + 1; i <= n; i++) {
        P[i] = i;
      }
    }

    const row = new Array(n);
    for (let i = 1; i <= n; i++) {
      row[i - 1] = P[i];
    }
    out.push(row.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
