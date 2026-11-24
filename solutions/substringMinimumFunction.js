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
  const T = nextInt();
  if (T === null) return;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const m = nextInt();
    const z = n - m;
    const parts = m + 1;
    const q = Math.floor(z / parts);
    const r = z % parts;
    const costShort = Math.floor((q * (q + 1)) / 2);
    const costLong = Math.floor(((q + 1) * (q + 2)) / 2);
    const total = r * costLong + (parts - r) * costShort;
    out.push(total);
  }
  console.log(out.join('\n'));
}

solve();
