const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function readInt() {
    while (pos < buf.length && buf[pos] <= 32) {
      pos++;
    }
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const t = readInt();
  if (t === null) return;

  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = readInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = readInt();
    }
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      b[i] = readInt();
    }

    let same = true;
    let rev = true;

    for (let i = 0; i < n; i++) {
      if (a[i] !== b[i]) same = false;
      if (a[i] !== b[n - 1 - i]) rev = false;
      if (!same && !rev) break;
    }

    if (same || rev) {
      out.push('Bob');
    } else {
      out.push('Alice');
    }
  }

  console.log(out.join('\n'));
}

solve();
