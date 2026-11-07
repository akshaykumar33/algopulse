const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }
    a.sort();

    const suff = new BigInt64Array(n + 1);
    for (let i = n - 1; i >= 0; i--) {
      suff[i] = suff[i + 1] + BigInt(Math.round(a[i]));
    }

    const res = [];
    for (let k = 0; k < n; k++) {
      res.push(suff[k].toString());
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
