const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(BigInt(input[ptr++]));

    a.sort((x, y) => (x > y ? -1 : x < y ? 1 : 0));

    let sum1 = 0n;
    let sum2 = 0n;
    for (let i = 0; i < k; i++) {
      sum1 += a[2 * i];
      sum2 += a[2 * i + 1];
    }
    sum2 += a[2 * k];

    const best = sum1 > sum2 ? sum1 : sum2;
    out.push(best.toString());
  }
  console.log(out.join('\n'));
}

solve();
