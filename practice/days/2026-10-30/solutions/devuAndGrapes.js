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
    let totalOps = 0n;

    for (let i = 0; i < n; i++) {
      const a = BigInt(input[ptr++]);
      if (a < k) {
        totalOps += k - a;
      } else {
        const rem = a % k;
        const add = k - rem;
        totalOps += rem < add ? rem : add;
      }
    }

    out.push(totalOps.toString());
  }

  console.log(out.join('\n'));
}

solve();
