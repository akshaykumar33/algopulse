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
  const MOD = 998244353n;
  const out = [];
  for (let t = 0; t < T; t++) {
    const l = BigInt(nextInt());
    const r = BigInt(nextInt());
    let maxLen = 0n;
    let temp = l;
    while (temp <= r) {
      maxLen++;
      temp *= 2n;
    }
    let count = 0n;
    const pow1 = 1n << (maxLen - 1n);
    const high1 = r / pow1;
    if (high1 >= l) {
      count = (count + (high1 - l + 1n)) % MOD;
    }
    if (maxLen >= 2n) {
      const pow2 = 3n * (1n << (maxLen - 2n));
      const high2 = r / pow2;
      if (high2 >= l) {
        count = (count + (high2 - l + 1n) * (maxLen - 1n)) % MOD;
      }
    }
    out.push(maxLen.toString() + ' ' + count.toString());
  }
  console.log(out.join('\n'));
}
solve();