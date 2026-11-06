const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const m = Number(input[ptr++]);
    const drop = new Int32Array(m);
    let curSum = 0n;

    for (let i = 0; i < n; i++) {
      const a = Number(input[ptr++]);
      curSum += BigInt(a);
      const k = m - 1 - a;
      drop[k]++;
    }

    let minSum = curSum;
    const bigN = BigInt(n);
    const bigM = BigInt(m);

    for (let k = 0; k < m - 1; k++) {
      curSum += bigN - bigM * BigInt(drop[k]);
      if (curSum < minSum) {
        minSum = curSum;
      }
    }

    out.push(minSum.toString());
  }

  console.log(out.join('\n'));
}

solve();

