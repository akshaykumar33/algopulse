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
    const h = new Int32Array(n);
    for (let i = 0; i < n; i++) h[i] = nextInt();
    const ans = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      let count = 0;
      for (let j = i - 1; j >= 0; j--) {
        if (h[j] > h[i]) break;
        if (h[j] === h[i]) count++;
      }
      for (let j = i + 1; j < n; j++) {
        if (h[j] > h[i]) break;
        if (h[j] === h[i]) count++;
      }
      ans[i] = count;
    }
    out.push(Array.from(ans).join(' '));
  }
  console.log(out.join('\n'));
}
solve();