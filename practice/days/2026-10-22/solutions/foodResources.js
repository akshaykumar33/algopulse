const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;
  let ptr = 0;
  const out = [];

  while (ptr < input.length) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    if (isNaN(n) || isNaN(m)) break;
    const a = new Int32Array(n);
    let maxA = 0;
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
      if (a[i] > maxA) maxA = a[i];
    }

    let low = 1, high = maxA, ans = 0;
    while (low <= high) {
      const mid = (low + high) >> 1;
      let count = 0;
      for (let i = 0; i < n; i++) {
        count += Math.floor(a[i] / mid);
        if (count >= m) break;
      }
      if (count >= m) {
        ans = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
