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

    let sum = a[n - 1] - a[n - 2];
    for (let i = 0; i < n - 2; i++) {
      sum += a[i] < 0n ? -a[i] : a[i];
    }

    out.push(sum.toString());
  }

  console.log(out.join('\n'));
}

solve();

