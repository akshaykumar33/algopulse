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
    const m = nextInt();
    const a = new Int32Array(m);
    for (let i = 0; i < m; i++) a[i] = nextInt();
    a.sort();

    const gaps = new Int32Array(m);
    for (let i = 0; i < m - 1; i++) {
      gaps[i] = a[i + 1] - a[i] - 1;
    }
    gaps[m - 1] = n - a[m - 1] + a[0] - 1;
    gaps.sort();

    let d = 0;
    let saved = 0;
    for (let i = m - 1; i >= 0; i--) {
      const rem = gaps[i] - 2 * d;
      if (rem <= 0) break;
      if (rem === 1 || rem === 2) {
        saved += 1;
        d += 1;
      } else {
        saved += rem - 1;
        d += 2;
      }
    }

    out.push(n - saved);
  }

  console.log(out.join('\n'));
}

solve();
