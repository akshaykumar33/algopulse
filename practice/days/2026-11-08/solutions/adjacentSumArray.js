const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const b = new Int32Array(n - 1);
    for (let i = 0; i < n - 1; i++) {
      b[i] = parseInt(tokens[ptr++], 10);
    }
    b.sort();

    const a = new Int32Array(n);
    a[0] = 1;
    for (let i = 0; i < n - 1; i++) {
      a[i + 1] = b[i] - a[i];
    }

    out.push(a.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
