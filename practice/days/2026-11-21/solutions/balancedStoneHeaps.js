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
  const tVal = nextInt();
  if (tVal === null) return;
  const T = tVal;
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = nextInt();
    const h = new Float64Array(n);
    let maxH = 0;
    for (let i = 0; i < n; i++) {
      h[i] = nextInt();
      if (h[i] > maxH) maxH = h[i];
    }
    const temp = new Float64Array(n);
    function check(X) {
      for (let i = 0; i < n; i++) temp[i] = h[i];
      for (let i = n - 1; i >= 2; i--) {
        if (temp[i] < X) return false;
        const d = Math.min(Math.floor((temp[i] - X) / 3), Math.floor(h[i] / 3));
        temp[i] -= 3 * d;
        temp[i - 1] += d;
        temp[i - 2] += 2 * d;
      }
      return temp[0] >= X && temp[1] >= X;
    }
    let lo = 1, hi = maxH, ans = 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (check(mid)) {
        ans = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}
solve();