const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = BigInt(input[ptr++]);
    }
    const c = new Array(n);
    for (let i = 0; i < n; i++) {
      c[i] = BigInt(input[ptr++]);
    }

    let minC = c[0];
    let totalCost = 0n;
    for (let i = 0; i < n; i++) {
      if (c[i] < minC) minC = c[i];
      totalCost += a[i] * minC;
    }
    out.push(totalCost.toString());
  }

  console.log(out.join('\n'));
}

solve();

