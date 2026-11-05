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
  const n = nextInt();
  if (n === null) return;
  const m = nextInt();
  const a = [];
  for (let i = 0; i < n; i++) {
    const row = new Float64Array(m);
    for (let j = 0; j < m; j++) {
      row[j] = nextInt();
    }
    a.push(row);
  }
  const l = nextInt();
  let e1 = 0, e2 = 0;
  let ok1 = true, ok2 = true;
  for (let k = 0; k < l; k++) {
    const r = nextInt();
    const c = nextInt();
    if (ok1) {
      if (r >= 1 && r <= n && c >= 1 && c <= m) {
        e1 += a[r - 1][c - 1];
      } else {
        ok1 = false;
      }
    }
    if (ok2) {
      if (c >= 1 && c <= n && r >= 1 && r <= m) {
        e2 += a[c - 1][r - 1];
      } else {
        ok2 = false;
      }
    }
  }
  const ans1 = ok1 ? e1 : -1;
  const ans2 = ok2 ? e2 : -1;
  console.log(Math.max(ans1, ans2));
}

solve();
