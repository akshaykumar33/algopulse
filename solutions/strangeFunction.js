const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextBigInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const tVal = nextBigInt();
  if (tVal === null) return;
  const t = Number(tVal);
  const out = [];
  function dr(x) {
    const r = x % 9n;
    return r === 0n ? 9n : r;
  }
  function mul(x, y) {
    return dr(x * y);
  }
  for (let tc = 0; tc < t; tc++) {
    const a = nextBigInt();
    let n = nextBigInt();
    let base = dr(a);
    let res = 1n;
    while (n > 0n) {
      if (n & 1n) res = mul(res, base);
      base = mul(base, base);
      n >>= 1n;
    }
    out.push(res.toString());
  }
  console.log(out.join('\n'));
}

solve();
