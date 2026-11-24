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
  for (let tc = 0; tc < t; tc++) {
    const x = nextBigInt();
    const y = nextBigInt();
    let n = 0n;
    if (x === y) {
      n = x;
    } else if (x > y) {
      n = x + y;
    } else {
      const r = y % x;
      n = y - r / 2n;
    }
    out.push(n.toString());
  }
  console.log(out.join('\n'));
}

solve();
