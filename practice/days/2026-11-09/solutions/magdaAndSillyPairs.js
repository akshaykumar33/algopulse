const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let sumA = 0n;
    let evensA = 0;
    for (let i = 0; i < n; i++) {
      const val = BigInt(tokens[ptr++]);
      sumA += val;
      if (val % 2n === 0n) evensA++;
    }

    let sumB = 0n;
    let evensB = 0;
    for (let i = 0; i < n; i++) {
      const val = BigInt(tokens[ptr++]);
      sumB += val;
      if (val % 2n === 0n) evensB++;
    }

    const diff = BigInt(Math.abs(evensA - evensB));
    const ans = (sumA + sumB - diff) / 2n;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
