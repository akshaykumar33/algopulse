const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let oddSum = 0n;
    let evenSum = 0n;
    let oddPos = 0;
    let evenPos = 0;
    let maxVal = -1000000000000000000n;

    for (let i = 1; i <= n; i++) {
      const val = BigInt(tokens[ptr++]);
      if (val > maxVal) maxVal = val;
      if (i % 2 === 1) {
        if (val > 0n) {
          oddSum += val;
          oddPos++;
        }
      } else {
        if (val > 0n) {
          evenSum += val;
          evenPos++;
        }
      }
    }

    if (oddPos === 0 && evenPos === 0) {
      out.push(maxVal.toString());
    } else {
      const best = oddSum > evenSum ? oddSum : evenSum;
      out.push(best.toString());
    }
  }
  console.log(out.join('\n'));
}

solve();
