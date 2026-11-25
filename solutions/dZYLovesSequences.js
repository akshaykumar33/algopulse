const fs = require('fs');

function solve() {
  const data = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (data.length === 0 || data[0] === '') return;
  const n = parseInt(data[0], 10);
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = parseInt(data[i + 1], 10);
  if (n <= 2) {
    console.log(n);
    return;
  }
  const left = new Int32Array(n);
  const right = new Int32Array(n);
  left[0] = 1;
  for (let i = 1; i < n; i++) {
    left[i] = a[i] > a[i - 1] ? left[i - 1] + 1 : 1;
  }
  right[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    right[i] = a[i] < a[i + 1] ? right[i + 1] + 1 : 1;
  }
  let ans = 1;
  for (let i = 0; i < n; i++) {
    if (left[i] > ans) ans = left[i];
    if (i > 0 && left[i - 1] + 1 > ans) ans = left[i - 1] + 1;
    if (i + 1 < n && right[i + 1] + 1 > ans) ans = right[i + 1] + 1;
    if (i > 0 && i + 1 < n && a[i + 1] - a[i - 1] >= 2) {
      const len = left[i - 1] + 1 + right[i + 1];
      if (len > ans) ans = len;
    }
  }
  console.log(ans);
}

solve();
