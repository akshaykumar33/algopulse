const fs = require('fs');
const buf = fs.readFileSync(0);
let pos = 0;
const len = buf.length;

function nextInt() {
  while (pos < len && buf[pos] <= 32) pos++;
  if (pos >= len) return 0;
  let neg = false;
  if (buf[pos] === 45) {
    neg = true;
    pos++;
  }
  let res = 0;
  while (pos < len && buf[pos] > 32) {
    res = res * 10 + (buf[pos] - 48);
    pos++;
  }
  return neg ? -res : res;
}

function solve() {
  const t = nextInt();
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const m = nextInt();
    const a = new Int32Array(n * m);
    for (let i = 0; i < n * m; i++) a[i] = nextInt();
    let ok = true;
    for (let i = 0; i < n && ok; i++) {
      for (let j = 0; j < m; j++) {
        let req = 1;
        if (i > 0 && a[(i - 1) * m + j] > req) req = a[(i - 1) * m + j];
        if (j > 0 && a[i * m + j - 1] > req) req = a[i * m + j - 1];
        const idx = i * m + j;
        if (a[idx] === -1) a[idx] = req;
        else if (a[idx] < req) {
          ok = false;
          break;
        }
      }
    }
    if (!ok) {
      out.push('-1');
    } else {
      for (let i = 0; i < n; i++) {
        const row = [];
        const base = i * m;
        for (let j = 0; j < m; j++) row.push(a[base + j]);
        out.push(row.join(' '));
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
