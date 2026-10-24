const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf.charCodeAt(pos) <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf.charCodeAt(pos) === 45) {
      sign = -1;
      pos++;
    }
    let res = 0;
    while (pos < buf.length && buf.charCodeAt(pos) >= 48 && buf.charCodeAt(pos) <= 57) {
      res = res * 10 + (buf.charCodeAt(pos) - 48);
      pos++;
    }
    return res * sign;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) b[i] = nextInt();

    const maxVal = new Map();
    for (let i = 0; i < n; i++) {
      const type = a[i];
      const val = b[i];
      if (!maxVal.has(type) || val > maxVal.get(type)) {
        maxVal.set(type, val);
      }
    }

    let total = 0;
    for (const val of maxVal.values()) {
      if (val > 0) total += val;
    }
    out.push(total);
  }

  console.log(out.join('\n'));
}

solve();
