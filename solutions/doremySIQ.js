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
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt(), q = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    const ans = new Uint8Array(n);
    let cur = 0;
    for (let i = n - 1; i >= 0; i--) {
      if (a[i] <= cur) {
        ans[i] = 1;
      } else if (cur < q) {
        cur++;
        ans[i] = 1;
      }
    }
    let s = '';
    for (let i = 0; i < n; i++) s += ans[i];
    out.push(s);
  }
  console.log(out.join('\n'));
}
solve();