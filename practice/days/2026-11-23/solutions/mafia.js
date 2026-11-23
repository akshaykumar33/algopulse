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
  const n = nextInt();
  if (n === null) return;
  let sum = 0n;
  let maxA = 0n;
  for (let i = 0; i < n; i++) {
    const a = BigInt(nextInt());
    sum += a;
    if (a > maxA) maxA = a;
  }
  const bigN1 = BigInt(n - 1);
  const ceilSum = (sum + bigN1 - 1n) / bigN1;
  const ans = maxA > ceilSum ? maxA : ceilSum;
  console.log(ans.toString());
}

solve();
