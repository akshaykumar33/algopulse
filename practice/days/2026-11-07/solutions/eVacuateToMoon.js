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
    const h = BigInt(tokens[ptr++]);

    const a = new Float64Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);
    a.sort().reverse();

    const b = new Float64Array(m);
    for (let i = 0; i < m; i++) b[i] = parseInt(tokens[ptr++], 10);
    b.sort().reverse();

    const limit = Math.min(n, m);
    let total = 0n;

    for (let i = 0; i < limit; i++) {
      const cap = BigInt(Math.round(a[i]));
      const outlet = BigInt(Math.round(b[i])) * h;
      total += cap < outlet ? cap : outlet;
    }

    out.push(total.toString());
  }

  console.log(out.join('\n'));
}

solve();
