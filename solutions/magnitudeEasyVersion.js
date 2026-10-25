const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= input.length) break;
    const n = parseInt(input[ptr++], 10);
    let minVal = 0n;
    let maxVal = 0n;

    for (let i = 0; i < n; i++) {
      const a = BigInt(input[ptr++]);
      const opt1 = maxVal + a;
      const opt2 = opt1 < 0n ? -opt1 : opt1;
      const opt3 = minVal + a;
      const opt4 = opt3 < 0n ? -opt3 : opt3;

      let nextMax = opt1;
      if (opt2 > nextMax) nextMax = opt2;
      if (opt3 > nextMax) nextMax = opt3;
      if (opt4 > nextMax) nextMax = opt4;

      minVal = minVal + a;
      maxVal = nextMax;
    }

    out.push(maxVal.toString());
  }

  console.log(out.join('\n'));
}

solve();
