const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const q = Number(input[ptr++]);
    const a = new BigInt64Array(n + 1);
    for (let i = 1; i <= n; i++) {
      a[i] = BigInt(input[ptr++]);
    }

    let sum = 0n;
    for (let i = 1; i < n; i++) {
      sum += a[i] < a[i + 1] ? a[i] : a[i + 1];
    }

    for (let j = 0; j < q; j++) {
      const idx = Number(input[ptr++]);
      const x = BigInt(input[ptr++]);

      if (idx > 1) {
        sum -= a[idx - 1] < a[idx] ? a[idx - 1] : a[idx];
      }
      if (idx < n) {
        sum -= a[idx] < a[idx + 1] ? a[idx] : a[idx + 1];
      }

      a[idx] = x;

      if (idx > 1) {
        sum += a[idx - 1] < a[idx] ? a[idx - 1] : a[idx];
      }
      if (idx < n) {
        sum += a[idx] < a[idx + 1] ? a[idx] : a[idx + 1];
      }

      out.push(sum.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();

