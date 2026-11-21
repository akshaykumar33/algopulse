const fs = require('fs');
function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextBigInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const nVal = nextBigInt();
  if (nVal === null) return;
  const n = Number(nVal);
  const m = Number(nextBigInt());
  const a = new Array(n);
  for (let i = 0; i < n; i++) a[i] = nextBigInt();
  const b = new Array(m);
  for (let j = 0; j < m; j++) b[j] = nextBigInt();
  function gcd(x, y) {
    while (y > 0n) {
      const r = x % y;
      x = y;
      y = r;
    }
    return x;
  }
  let g = 0n;
  for (let i = 1; i < n; i++) {
    const diff = a[i] > a[0] ? a[i] - a[0] : a[0] - a[i];
    g = gcd(g, diff);
  }
  const out = [];
  for (let j = 0; j < m; j++) {
    const ans = gcd(a[0] + b[j], g);
    out.push(ans.toString());
  }
  console.log(out.join(' '));
}
solve();