const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const A = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      A[i] = parseInt(input[ptr++], 10);
    }
    A.sort();

    const maxVal = A[n - 1];
    const secondVal = A[n - 2];

    if (maxVal === secondVal) {
      let cntMax = 0;
      for (let i = 0; i < n; i++) {
        if (A[i] === maxVal) cntMax++;
      }
      out.push(cntMax <= Math.floor((n + 1) / 2) ? 'YES' : 'NO');
    } else {
      let cntSecond = 0;
      for (let i = 0; i < n; i++) {
        if (A[i] === secondVal) cntSecond++;
      }
      const others = n - 1 - cntSecond;
      out.push(others >= 1 ? 'YES' : 'NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
