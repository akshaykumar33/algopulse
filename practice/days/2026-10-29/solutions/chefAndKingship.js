const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let minP = -1n;
    let sumP = 0n;

    for (let i = 0; i < n; i++) {
      const v = BigInt(input[ptr++]);
      sumP += v;
      if (minP === -1n || v < minP) {
        minP = v;
      }
    }

    const ans = minP * (sumP - minP);
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
