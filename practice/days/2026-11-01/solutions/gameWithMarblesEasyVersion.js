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
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);
    for (let i = 0; i < n; i++) b[i] = parseInt(tokens[ptr++], 10);

    const order = Array.from({ length: n }, (_, i) => i);
    order.sort((i, j) => (b[j] + a[j]) - (b[i] + a[i]));

    let score = 0n;
    for (let turn = 0; turn < n; turn++) {
      const idx = order[turn];
      if (turn % 2 === 0) {
        score += BigInt(a[idx] - 1);
      } else {
        score -= BigInt(b[idx] - 1);
      }
    }
    out.push(score.toString());
  }

  console.log(out.join('\n'));
}

solve();

