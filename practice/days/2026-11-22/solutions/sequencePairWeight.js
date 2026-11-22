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
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const sumMap = new Map();
    let total = 0n;
    for (let j = 1; j <= n; j++) {
      const val = nextInt();
      const prevSum = sumMap.get(val) || 0n;
      total += prevSum * BigInt(n - j + 1);
      sumMap.set(val, prevSum + BigInt(j));
    }
    out.push(total.toString());
  }
  console.log(out.join('\n'));
}
solve();