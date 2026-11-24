const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextBigInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1n;
    if (buf[pos] === 45) {
      sign = -1n;
      pos++;
    }
    let res = 0n;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }
  let x = nextBigInt();
  if (x === null) return;
  let y = nextBigInt();
  let m = nextBigInt();
  if (x >= m || y >= m) {
    console.log(0);
    return;
  }
  if (x <= 0n && y <= 0n) {
    console.log(-1);
    return;
  }
  if (x > y) {
    const t = x;
    x = y;
    y = t;
  }
  let ans = 0n;
  if (x < 0n) {
    const step = (-x + y - 1n) / y;
    x += step * y;
    ans += step;
  }
  while (x < m && y < m) {
    if (x > y) {
      const t = x;
      x = y;
      y = t;
    }
    x = x + y;
    ans++;
  }
  console.log(ans.toString());
}

solve();
