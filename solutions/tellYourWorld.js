const fs = require('fs');
function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf[pos] === 45) { sign = -1; pos++; }
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }
  const n = nextInt();
  if (n === null) return;
  const y = new Float64Array(n + 1);
  for (let i = 1; i <= n; i++) y[i] = nextInt();
  function check(p1, p2) {
    const dy = y[p2] - y[p1];
    const dx = p2 - p1;
    let otherP = -1;
    for (let i = 1; i <= n; i++) {
      if ((y[i] - y[p1]) * dx !== dy * (i - p1)) {
        if (otherP === -1) otherP = i;
        else if ((y[i] - y[otherP]) * dx !== dy * (i - otherP)) {
          return false;
        }
      }
    }
    return otherP !== -1;
  }
  if (check(1, 2) || check(1, 3) || check(2, 3)) {
    console.log('Yes');
  } else {
    console.log('No');
  }
}
solve();