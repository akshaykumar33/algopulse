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
  const T = tVal;
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = nextInt();
    out.push(Math.max(0, n - 2));
  }
  console.log(out.join('\n'));
}
solve();