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
    const k = nextInt();
    const x = new Int32Array(n);
    for (let i = 0; i < n; i++) x[i] = nextInt();
    let ans = 0;
    for (let i = 0; i < n; i++) {
      const gap = (i === 0 ? x[0] - 1 : x[i] - x[i - 1] - 1);
      const weight = Math.ceil((n - i) / k);
      ans += gap * weight;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
