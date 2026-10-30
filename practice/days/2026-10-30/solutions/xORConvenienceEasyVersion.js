const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    if ((n & (n - 1)) === 0) {
      out.push('-1');
      continue;
    }
    const p = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) p[i] = i;

    for (let i = 2; i < n; i += 2) {
      const tmp = p[i];
      p[i] = p[i + 1];
      p[i + 1] = tmp;
    }
    const tmp = p[1];
    p[1] = p[n];
    p[n] = tmp;

    if ((n & 1) === 0) {
      const msb = 1 << Math.floor(Math.log2(n));
      const target = n % msb;
      const t2 = target === 0 ? msb : target;
      const swp = p[1];
      p[1] = p[t2];
      p[t2] = swp;
    }

    out.push(p.slice(1).join(' '));
  }
  console.log(out.join('\n'));
}

solve();
