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
  const t = tVal;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = nextInt();
    const b = new Int32Array(n);
    let maxB = 0;
    let sumB = 0;
    for (let i = 0; i < n; i++) {
      b[i] = nextInt();
      if (b[i] > maxB) maxB = b[i];
      sumB += b[i];
    }
    let low = maxB;
    let high = sumB;
    let ans = high;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      let count = 1;
      let cur = 0;
      for (let i = 0; i < n; i++) {
        if (cur + b[i] > mid) {
          count++;
          cur = b[i];
        } else {
          cur += b[i];
        }
      }
      if (count <= a) {
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
