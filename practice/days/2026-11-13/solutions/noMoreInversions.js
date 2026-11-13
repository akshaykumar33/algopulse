const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
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
    const m = 2 * k - n;
    const res = [];
    for (let i = 1; i < m; i++) {
      res.push(i);
    }
    for (let i = k; i >= m; i--) {
      res.push(i);
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
