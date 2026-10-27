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

    if ((n + 1) % 3 !== 0) {
      out.push(-1);
      continue;
    }

    const a = new Int32Array(n);
    const neg = m - 1;
    for (let i = 1; i <= n; i++) {
      const rem = i % 6;
      if (rem === 1 || rem === 2) {
        a[i - 1] = 1;
      } else if (rem === 3 || rem === 0) {
        a[i - 1] = 0;
      } else {
        a[i - 1] = neg;
      }
    }
    out.push(a.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
