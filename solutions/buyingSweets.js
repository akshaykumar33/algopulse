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
    let r = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) b[i] = nextInt();
    const idx = new Int32Array(n);
    for (let i = 0; i < n; i++) idx[i] = i;
    idx.sort((i1, i2) => {
      const c1 = a[i1] - b[i1];
      const c2 = a[i2] - b[i2];
      if (c1 !== c2) return c1 - c2;
      return a[i1] - a[i2];
    });
    let total = 0;
    for (let k = 0; k < n; k++) {
      const i = idx[k];
      const price = a[i];
      const net = price - b[i];
      if (r >= price) {
        const count = 1 + Math.floor((r - price) / net);
        total += count;
        r -= count * net;
      }
    }
    out.push(total);
  }
  console.log(out.join('\n'));
}

solve();
