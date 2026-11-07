const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const b = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      b[i] = i % 2 === 0 ? v : -v;
    }

    let pos = 0n;
    let neg = 0n;
    let prev = 0n;

    for (let i = 0; i <= n; i++) {
      const cur = i < n ? BigInt(Math.round(b[i])) : 0n;
      const diff = cur - prev;
      if (diff > 0n) pos += diff;
      else if (diff < 0n) neg -= diff;
      prev = cur;
    }

    out.push((pos > neg ? pos : neg).toString());
  }

  console.log(out.join('\n'));
}

solve();
