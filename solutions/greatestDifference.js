const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = parseInt(input[ptr++], 10);
    if (s < 1 || s > 9 * n) {
      out.push('NO');
      continue;
    }

    const maxDigits = new Array(n);
    let remMax = s;
    for (let i = 0; i < n; i++) {
      const d = Math.min(9, remMax);
      maxDigits[i] = d;
      remMax -= d;
    }

    const minDigits = new Array(n);
    let remMin = s;
    const firstDigit = Math.max(1, remMin - 9 * (n - 1));
    minDigits[0] = firstDigit;
    remMin -= firstDigit;
    for (let i = 1; i < n; i++) {
      const d = Math.max(0, remMin - 9 * (n - 1 - i));
      minDigits[i] = d;
      remMin -= d;
    }

    const maxVal = BigInt(maxDigits.join(''));
    const minVal = BigInt(minDigits.join(''));
    out.push((maxVal - minVal).toString());
  }
  console.log(out.join('\n'));
}

solve();
