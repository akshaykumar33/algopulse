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
    const n = nextInt();
    const m = nextInt();
    const k = nextInt();
    if ((n === 1 && m <= 2) || (m === 1 && n <= 2)) {
      out.push(0);
    } else if (n === 1 || m === 1) {
      out.push(k);
    } else {
      out.push(Math.floor((k + 1) / 2));
    }
  }
  console.log(out.join('\n'));
}

solve();
