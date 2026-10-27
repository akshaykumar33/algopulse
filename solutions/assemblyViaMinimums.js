const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = (n * (n - 1)) / 2;
    const b = new Int32Array(m);
    for (let i = 0; i < m; i++) {
      b[i] = parseInt(tokens[ptr++], 10);
    }
    b.sort();

    const a = [];
    let idx = 0;
    for (let i = 1; i < n; i++) {
      a.push(b[idx]);
      idx += (n - i);
    }
    a.push(1000000000);
    out.push(a.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
