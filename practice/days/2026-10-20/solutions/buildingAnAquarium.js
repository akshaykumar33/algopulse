const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const x = Number(input[ptr++]);
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = Number(input[ptr++]);
    }

    let low = 1;
    let high = 2000000007;
    let ans = 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      let sum = 0;
      for (let i = 0; i < n; i++) {
        if (a[i] < mid) {
          sum += mid - a[i];
        }
      }
      if (sum <= x) {
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
