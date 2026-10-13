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
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }

    let ans = 1e9;
    for (let i = 0; i < n; i++) {
      for (let k = i - 1; k >= 0; k--) {
        if (Math.abs(a[k] - a[i]) <= 1) {
          const cost = i - k - 1;
          if (cost < ans) ans = cost;
        }
        if (k - 1 >= 0) {
          const mn = a[k] < a[k - 1] ? a[k] : a[k - 1];
          const mx = a[k] > a[k - 1] ? a[k] : a[k - 1];
          if (a[i] >= mn && a[i] <= mx) {
            const cost = i - k;
            if (cost < ans) ans = cost;
          }
        }
      }
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(a[k] - a[i]) <= 1) {
          const cost = k - i - 1;
          if (cost < ans) ans = cost;
        }
        if (k + 1 < n) {
          const mn = a[k] < a[k + 1] ? a[k] : a[k + 1];
          const mx = a[k] > a[k + 1] ? a[k] : a[k + 1];
          if (a[i] >= mn && a[i] <= mx) {
            const cost = k - i;
            if (cost < ans) ans = cost;
          }
        }
      }
    }

    out.push(ans < 1e9 ? ans : -1);
  }

  console.log(out.join('\n'));
}

solve();
