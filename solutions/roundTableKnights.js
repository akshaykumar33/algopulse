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
  const a = new Uint8Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();
  const divs = [];
  for (let d = 1; d * d <= n; d++) {
    if (n % d === 0) {
      if (n / d >= 3) divs.push(d);
      const d2 = n / d;
      if (d2 !== d && n / d2 >= 3) divs.push(d2);
    }
  }
  for (const step of divs) {
    const k = n / step;
    for (let start = 0; start < step; start++) {
      let ok = true;
      for (let i = 0; i < k; i++) {
        if (a[start + i * step] === 0) {
          ok = false;
          break;
        }
      }
      if (ok) {
        console.log('YES');
        return;
      }
    }
  }
  console.log('NO');
}
solve();