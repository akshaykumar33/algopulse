const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let total = 0n;
    let odds = 0;
    let maxVal = 0n;
    for (let i = 0; i < n; i++) {
      const v = BigInt(input[ptr++]);
      total += v;
      if (v > maxVal) maxVal = v;
      if ((v & 1n) === 1n) odds++;
    }
    if (odds === 0 || odds === n) {
      out.push(maxVal.toString());
    } else {
      out.push((total - BigInt(odds) + 1n).toString());
    }
  }
  console.log(out.join('\n'));
}

solve();
