const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let minVal = BigInt(tokens[ptr++]);
    let maxVal = minVal;

    for (let i = 1; i < n; i++) {
      const v = BigInt(tokens[ptr++]);
      if (v < minVal) minVal = v;
      if (v > maxVal) maxVal = v;
    }

    let minAns;
    if (minVal >= 0n) {
      minAns = minVal * minVal;
    } else if (maxVal <= 0n) {
      minAns = maxVal * maxVal;
    } else {
      minAns = minVal * maxVal;
    }

    const sq1 = minVal * minVal;
    const sq2 = maxVal * maxVal;
    const maxAns = sq1 > sq2 ? sq1 : sq2;

    out.push(`${minAns.toString()} ${maxAns.toString()}`);
  }

  console.log(out.join('\n'));
}

solve();

