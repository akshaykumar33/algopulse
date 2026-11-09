const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Int32Array(n);
    let maxA = 0;
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
      if (a[i] > maxA) maxA = a[i];
    }
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      b[i] = parseInt(input[ptr++], 10);
    }

    let low = 1;
    let high = maxA;
    let ans = maxA;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      let sumB = 0;
      for (let i = 0; i < n; i++) {
        if (a[i] > mid) {
          sumB += b[i];
        }
      }
      if (sumB <= mid) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
