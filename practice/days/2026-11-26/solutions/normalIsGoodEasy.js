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

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let ans = 0;
    let prev = -1;
    let len = 0;
    for (let i = 0; i < n; i++) {
      const v = nextInt();
      if (v === prev) {
        len++;
      } else {
        prev = v;
        len = 1;
      }
      ans += len;
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
