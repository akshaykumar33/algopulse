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
    const k = nextInt();
    if (k === 1) {
      out.push('-1');
      continue;
    }
    if (k === 2 && (n & 1) === 1) {
      out.push('-1');
      continue;
    }
    if (n === 1) {
      out.push('-1');
      continue;
    }
    let found = false;
    for (let d = 1; d < n; d++) {
      let ok = true;
      for (let i = 1; i <= n; i++) {
        const p_i = ((i - 1 + d) % n) + 1;
        if (p_i % k === i % k) {
          ok = false;
          break;
        }
      }
      if (ok) {
        const p = new Int32Array(n);
        for (let i = 1; i <= n; i++) p[i - 1] = ((i - 1 + d) % n) + 1;
        out.push(p.join(' '));
        found = true;
        break;
      }
    }
    if (!found) {
      out.push('-1');
    }
  }
  console.log(out.join('\n'));
}

solve();
