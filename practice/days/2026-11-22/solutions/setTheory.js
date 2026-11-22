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
  const diff = new Uint8Array(1000005);
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    a.sort();
    diff.fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < i; j++) {
        diff[a[i] - a[j]] = 1;
      }
    }
    const b = [];
    let cand = 1;
    while (b.length < n) {
      let ok = true;
      for (let i = 0; i < b.length; i++) {
        if (diff[cand - b[i]]) {
          ok = false;
          break;
        }
      }
      if (ok) b.push(cand);
      cand++;
    }
    out.push('YES');
    out.push(b.join(' '));
  }
  console.log(out.join('\n'));
}
solve();