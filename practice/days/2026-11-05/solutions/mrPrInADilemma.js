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
  for (let i = 0; i < t; i++) {
    const a = nextInt();
    const b = nextInt();
    const c = nextInt();
    const d = nextInt();
    if (a === b) {
      out.push('YES');
    } else if (c === d) {
      out.push('NO');
    } else {
      const diff = Math.abs(a - b);
      const cdiff = Math.abs(c - d);
      if (diff % cdiff === 0) {
        out.push('YES');
      } else {
        out.push('NO');
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
