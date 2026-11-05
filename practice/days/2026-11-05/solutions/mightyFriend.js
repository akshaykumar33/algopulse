const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);

    const motu = [];
    const tomu = [];
    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      if (i % 2 === 0) {
        motu.push(val);
      } else {
        tomu.push(val);
      }
    }

    motu.sort((a, b) => b - a);
    tomu.sort((a, b) => a - b);

    const limit = Math.min(k, motu.length, tomu.length);
    for (let i = 0; i < limit; i++) {
      if (motu[i] > tomu[i]) {
        const temp = motu[i];
        motu[i] = tomu[i];
        tomu[i] = temp;
      } else {
        break;
      }
    }

    let sumMotu = 0;
    for (let i = 0; i < motu.length; i++) sumMotu += motu[i];
    let sumTomu = 0;
    for (let i = 0; i < tomu.length; i++) sumTomu += tomu[i];

    out.push(sumTomu > sumMotu ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

