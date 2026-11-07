const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let baseSum = 0n;
    let minPos = Infinity;
    let maxNeg = -Infinity;

    for (let i = 0; i < n; i++) {
      const val = Math.abs(parseInt(tokens[ptr++], 10));
      if (i % 2 === 0) {
        baseSum += BigInt(val);
        if (val < minPos) minPos = val;
      } else {
        baseSum -= BigInt(val);
        if (val > maxNeg) maxNeg = val;
      }
    }

    if (maxNeg > minPos) {
      baseSum += BigInt(2 * (maxNeg - minPos));
    }

    out.push(baseSum.toString());
  }

  console.log(out.join('\n'));
}

solve();
