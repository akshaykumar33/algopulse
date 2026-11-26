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

  const t = nextBigInt();
  if (t === null) return;

  const out = [];

  for (let tc = 0; tc < Number(t); tc++) {
    const x = nextBigInt();
    const y = nextBigInt();
    let ans = x * y - x - y;
    if (ans <= 0n) {
      ans = 5n * x * y - x - y;
    }
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
