const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    let c0 = 0;
    let c1 = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '0') c0++;
      else c1++;
    }

    let validCount = 0;
    for (let k = 1; k <= n; k++) {
      const canAllOne = k >= c0 && (k - c0) % 2 === 0;
      const canAllZero = k >= c1 && (k - c1) % 2 === 0;
      if (canAllOne || canAllZero) {
        validCount++;
      }
    }

    out.push(validCount);
  }

  console.log(out.join('\n'));
}

solve();
