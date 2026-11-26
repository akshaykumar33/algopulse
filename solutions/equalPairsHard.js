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
    const f = new Int32Array(n + 1);
    let ans = 0;
    let mx = 0;
    const res = [];
    for (let i = 1; i <= n; i++) {
      const x = nextInt();
      const y = nextInt();
      ans += f[y];
      f[y]++;
      if (f[y] > mx) mx = f[y];
      const rem = n - i;
      const v = mx * rem + (rem * (rem - 1)) / 2;
      res.push(ans + v);
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
