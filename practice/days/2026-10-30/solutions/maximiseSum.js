const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let negCount = 0;
    let hasZero = false;
    let sumAbs = 0;
    let minAbs = Infinity;

    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      if (val < 0) {
        negCount++;
      } else if (val === 0) {
        hasZero = true;
      }
      const absVal = Math.abs(val);
      sumAbs += absVal;
      if (absVal < minAbs) {
        minAbs = absVal;
      }
    }

    if (negCount % 2 === 0 || hasZero) {
      out.push(sumAbs);
    } else {
      out.push(sumAbs - 2 * minAbs);
    }
  }

  console.log(out.join('\n'));
}

solve();
