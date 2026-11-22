const fs = require('fs');
function applyFloor(x, y) {
  while (y > 0 && x > 0) {
    x = Math.floor(x / 2);
    y--;
  }
  return x;
}
function applyCeil(x, y) {
  while (y > 0 && x > 1) {
    x = Math.ceil(x / 2);
    y--;
  }
  return x;
}
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
    const x = nextInt(), n = nextInt(), m = nextInt();
    const minVal = applyFloor(applyCeil(x, m), n);
    const maxVal = applyCeil(applyFloor(x, n), m);
    out.push(minVal + ' ' + maxVal);
  }
  console.log(out.join('\n'));
}
solve();