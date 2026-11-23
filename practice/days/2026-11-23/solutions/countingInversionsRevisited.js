const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = BigInt(input[ptr++]);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(input[ptr++], 10));
    }
    let c1 = 0n;
    let c2 = 0n;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (a[i] > a[j]) {
          if (i < j) c1++;
          else c2++;
        }
      }
    }
    const term1 = c1 * (k * (k + 1n) / 2n);
    const term2 = c2 * (k * (k - 1n) / 2n);
    out.push((term1 + term2).toString());
  }
  console.log(out.join('\n'));
}

solve();
