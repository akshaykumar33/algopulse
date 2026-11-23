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
    const l = nextInt();
    const r = nextInt();
    const len = r - l + 1;
    const a = new Int32Array(len);
    for (let i = 0; i < len; i++) a[i] = nextInt();
    let x = 0;
    for (let b = 0; b <= 17; b++) {
      let c1 = 0;
      for (let i = 0; i < len; i++) {
        if ((a[i] >> b) & 1) c1++;
      }
      const full = Math.floor((r + 1) / (1 << (b + 1))) * (1 << b);
      const rem = Math.max(0, ((r + 1) % (1 << (b + 1))) - (1 << b));
      const orig1 = full + rem;
      if (c1 !== orig1) {
        x |= (1 << b);
      }
    }
    out.push(x);
  }
  console.log(out.join('\n'));
}

solve();
