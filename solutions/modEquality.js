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
  const T = nextInt();
  if (T === null) return;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const a = new Int32Array(n);
    let minVal = Infinity;
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
      if (a[i] < minVal) minVal = a[i];
    }
    let minCount = 0;
    let ok = true;
    for (let i = 0; i < n; i++) {
      if (a[i] === minVal) {
        minCount++;
      } else {
        if (a[i] <= 2 * minVal) {
          ok = false;
        }
      }
    }
    if (ok) {
      out.push(n - minCount);
    } else {
      out.push(n);
    }
  }
  console.log(out.join('\n'));
}
solve();