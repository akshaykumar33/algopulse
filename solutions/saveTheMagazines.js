const fs = require('fs');

const solve = () => {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    const a = input[ptr++].trim().split(/\s+/).map(Number);

    let sum = 0;
    let minVal = 0;
    let hasZero = false;

    for (let i = 0; i < n; i++) {
      if (s[i] === '0') {
        minVal = a[i];
        hasZero = true;
      } else {
        if (!hasZero) {
          sum += a[i];
        } else {
          if (a[i] < minVal) {
            sum += minVal;
            minVal = a[i];
          } else {
            sum += a[i];
          }
        }
      }
    }

    out.push(sum);
  }

  console.log(out.join('\n'));
};

solve();
