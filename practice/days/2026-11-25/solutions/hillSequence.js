const fs = require('fs');
const buf = fs.readFileSync(0);
let pos = 0;
const len = buf.length;

function nextInt() {
  while (pos < len && buf[pos] <= 32) pos++;
  if (pos >= len) return 0;
  let res = 0;
  while (pos < len && buf[pos] > 32) {
    res = res * 10 + (buf[pos] - 48);
    pos++;
  }
  return res;
}

function solve() {
  const t = nextInt();
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    a.sort();
    let ok = true;
    if (n >= 2 && a[n - 2] === a[n - 1]) ok = false;
    for (let i = 2; i < n && ok; i++) {
      if (a[i] === a[i - 2]) ok = false;
    }
    if (!ok) {
      out.push('-1');
      continue;
    }
    const res = [];
    for (let i = 0; i + 1 < n; i++) {
      if (a[i] === a[i + 1]) res.push(a[i]);
    }
    for (let i = n - 1; i >= 0; i--) {
      if (i === n - 1 || a[i] !== a[i + 1]) res.push(a[i]);
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
