const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }

    if (n <= 2) {
      out.push(-1);
      continue;
    }

    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      if (a[i] === 1) b[i] = 3;
      else if (a[i] === 3) b[i] = 1;
      else b[i] = a[i];
    }

    out.push(b.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
