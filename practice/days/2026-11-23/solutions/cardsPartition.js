const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
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
    const k = BigInt(nextInt());
    let maxA = 0n;
    let sum = 0n;
    for (let i = 0; i < n; i++) {
      const v = BigInt(nextInt());
      sum += v;
      if (v > maxA) maxA = v;
    }
    let ans = 1;
    for (let s = n; s >= 1; s--) {
      const bigS = BigInt(s);
      const ceilD = (sum + bigS - 1n) / bigS;
      const d = maxA > ceilD ? maxA : ceilD;
      if (d * bigS <= sum + k) {
        ans = s;
        break;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
