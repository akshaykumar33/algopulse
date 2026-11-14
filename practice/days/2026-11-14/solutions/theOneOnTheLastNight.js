const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const nStr = input[ptr++];
    let k = parseInt(input[ptr++], 10);
    const digits = nStr.split('').map(Number);

    while (k > 0) {
      let minIdx = -1;
      for (let i = 0; i < digits.length; i++) {
        if (digits[i] < 9) {
          if (minIdx === -1 || digits[i] < digits[minIdx]) {
            minIdx = i;
          }
        }
      }
      if (minIdx === -1) break;
      digits[minIdx]++;
      k--;
    }

    let prod = 1n;
    for (let i = 0; i < digits.length; i++) {
      prod *= BigInt(digits[i]);
    }
    out.push(prod.toString());
  }
  console.log(out.join('\n'));
}

solve();
