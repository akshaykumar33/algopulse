const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const x = BigInt(tokens[ptr++]);

    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(BigInt(tokens[ptr++]));
    }

    const b = [];
    for (let i = 0; i < n; i++) {
      b.push(BigInt(tokens[ptr++]));
    }

    const val = [];
    for (let i = 0; i < n; i++) {
      val.push(a[i] * b[i]);
    }

    val.sort((u, v) => (v > u ? 1 : v < u ? -1 : 0));

    let sum = 0n;
    let count = 0;
    for (let i = 0; i < n; i++) {
      if (sum >= x) break;
      sum += val[i];
      count++;
    }

    if (sum >= x) {
      out.push(count);
    } else {
      out.push(-1);
    }
  }

  console.log(out.join('\n'));
}

solve();

