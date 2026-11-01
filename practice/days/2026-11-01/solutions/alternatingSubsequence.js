const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let totalSum = 0n;
    let i = 0;
    while (i < n) {
      let maxVal = BigInt(tokens[ptr++]);
      const isPos = maxVal > 0n;
      let j = i + 1;
      while (j < n) {
        const nextVal = BigInt(tokens[ptr]);
        if ((nextVal > 0n) !== isPos) break;
        ptr++;
        if (nextVal > maxVal) {
          maxVal = nextVal;
        }
        j++;
      }
      totalSum += maxVal;
      i = j;
    }
    out.push(totalSum.toString());
  }

  console.log(out.join('\n'));
}

solve();

