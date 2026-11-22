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
    const x = nextInt(), y = nextInt();
    if (x === y) {
      out.push(-1);
    } else {
      const M = Math.max(x, y);
      const k = (1 << 30) - M;
      out.push(k);
    }
  }
  console.log(out.join('\n'));
}
solve();