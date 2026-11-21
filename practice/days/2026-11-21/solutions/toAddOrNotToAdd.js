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
    return sign * res;
  }
  const n = nextInt();
  if (n === null) return;
  const k = BigInt(nextInt());
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();
  a.sort();
  let bestLen = 0;
  let bestVal = a[0];
  let l = 0;
  let curSum = 0n;
  for (let r = 0; r < n; r++) {
    curSum += BigInt(a[r]);
    while (BigInt(r - l + 1) * BigInt(a[r]) - curSum > k) {
      curSum -= BigInt(a[l]);
      l++;
    }
    const len = r - l + 1;
    if (len > bestLen) {
      bestLen = len;
      bestVal = a[r];
    }
  }
  console.log(bestLen + ' ' + bestVal);
}
solve();