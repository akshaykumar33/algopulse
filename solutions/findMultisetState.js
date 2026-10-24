const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf.charCodeAt(pos) <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf.charCodeAt(pos) >= 48 && buf.charCodeAt(pos) <= 57) {
      res = res * 10 + (buf.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    const a = new Float64Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();

    let sumK = 0;
    for (let i = 0; i < k; i++) sumK += a[i];

    const res = [];
    for (let i = k; i < n - 1; i++) {
      res.push(a[i]);
    }
    res.push(a[n - 1] + sumK);
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
