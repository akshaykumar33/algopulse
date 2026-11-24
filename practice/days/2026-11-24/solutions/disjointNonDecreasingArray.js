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
    for (let i = 0; i < n; i++) a[i] = nextInt();
    let sorted = true;
    for (let i = 0; i < n - 1; i++) {
      if (a[i] > a[i + 1]) {
        sorted = false;
        break;
      }
    }
    if (sorted) {
      out.push('Yes');
      continue;
    }
    const s = [];
    for (let i = 1; i < n; i++) {
      if (a[i - 1] > a[i]) s.push(i);
    }
    let consecutive = false;
    for (let k = 0; k < s.length - 1; k++) {
      if (s[k + 1] === s[k] + 1) {
        consecutive = true;
        break;
      }
    }
    if (consecutive) {
      out.push('No');
      continue;
    }
    let x = 0;
    for (let k = 0; k < s.length; k++) {
      const idx = s[k];
      const diff = a[idx - 1] - a[idx];
      if (diff > x) x = diff;
    }
    for (let k = 0; k < s.length; k++) {
      a[s[k]] += x;
    }
    let ok = true;
    for (let i = 0; i < n - 1; i++) {
      if (a[i] > a[i + 1]) {
        ok = false;
        break;
      }
    }
    out.push(ok ? 'Yes' : 'No');
  }
  console.log(out.join('\n'));
}

solve();
