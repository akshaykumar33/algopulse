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
    let sum = 0n;
    let ans = 0n;
    for (let i = 0; i < n; i++) {
      const v = BigInt(nextInt());
      ans += sum * v;
      sum += v;
    }
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
