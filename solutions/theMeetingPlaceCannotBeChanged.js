const fs = require('fs');
function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const n = nextInt();
  if (n === null) return;
  const x = new Float64Array(n);
  for (let i = 0; i < n; i++) x[i] = nextInt();
  const v = new Float64Array(n);
  for (let i = 0; i < n; i++) v[i] = nextInt();
  let low = 0, high = 1e9;
  for (let iter = 0; iter < 100; iter++) {
    const mid = (low + high) / 2;
    let maxL = -Infinity, minR = Infinity;
    for (let i = 0; i < n; i++) {
      const l = x[i] - v[i] * mid;
      const r = x[i] + v[i] * mid;
      if (l > maxL) maxL = l;
      if (r < minR) minR = r;
    }
    if (maxL <= minR) high = mid;
    else low = mid;
  }
  console.log(high.toFixed(10));
}
solve();