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

  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = [];
    const b = [];
    const offset = 131072;

    for (let i = 1; i <= n; i++) {
      a.push(i + 1);
      b.push(i + 1 + offset);
    }

    out.push(a.join(' '));
    out.push(b.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
