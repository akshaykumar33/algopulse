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
    for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) b[i] = parseInt(tokens[ptr++], 10);

    if (n === 2) {
      const ok = (a[0] < a[1]) === (b[0] < b[1]);
      out.push(ok ? 'Yes' : 'No');
    } else {
      out.push('Yes');
    }
  }

  console.log(out.join('\n'));
}

solve();
