const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);
  const arr = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = parseInt(tokens[ptr++], 10);
  }
  arr.sort();

  const m = (n - 1) >> 1;
  let lo = arr[m];
  let hi = arr[m] + k;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo + 1) / 2);
    let need = 0;
    for (let i = m; i < n; i++) {
      if (arr[i] < mid) {
        need += mid - arr[i];
        if (need > k) break;
      } else {
        break;
      }
    }
    if (need <= k) {
      lo = mid;
    } else {
      hi = mid - 1;
    }
  }

  console.log(lo);
}

solve();
