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
    let x = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    let i = 0;
    while (i < n - 1 && x > 0) {
      if (a[i] === 0) {
        i++;
        continue;
      }
      let p = 30;
      while ((a[i] & (1 << p)) === 0) p--;
      const mask = 1 << p;
      a[i] ^= mask;
      let found = false;
      for (let j = i + 1; j < n; j++) {
        if ((a[j] & mask) !== 0) {
          a[j] ^= mask;
          found = true;
          break;
        }
      }
      if (!found) {
        a[n - 1] ^= mask;
      }
      x--;
    }
    if (x === 1 || (x % 2 === 1 && n === 2)) {
      a[n - 2] ^= 1;
      a[n - 1] ^= 1;
    }
    out.push(a.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
