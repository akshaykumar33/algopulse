const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    let k = BigInt(input[ptr++]);

    const maxSwaps = n / 2n;
    if (k > maxSwaps) k = maxSwaps;

    const total = n * (n - 1n) / 2n;
    const m = n - 2n * k;
    const nonInv = m > 1n ? m * (m - 1n) / 2n : 0n;
    const ans = total - nonInv;

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
