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
      a.push(BigInt(input[ptr++]));
    }
    const b = [];
    for (let i = 0; i < n; i++) {
      b.push(BigInt(input[ptr++]));
    }

    let maxProfit = 0n;
    for (let i = 0; i < n; i++) {
      const count = k / a[i];
      const profit = count * b[i];
      if (profit > maxProfit) maxProfit = profit;
    }
    out.push(maxProfit.toString());
  }
  console.log(out.join('\n'));
}

solve();
