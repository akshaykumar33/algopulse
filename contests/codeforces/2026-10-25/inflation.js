const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readBig() {
    while (offset < buffer.length && buffer[offset] <= 32) offset++;
    if (offset >= buffer.length) return null;
    let res = 0n;
    while (offset < buffer.length && buffer[offset] > 32) {
      res = res * 10n + BigInt(buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  const t = readBig();
  if (t === null) return;

  const out = [];
  for (let tc = 0n; tc < t; tc++) {
    const n = readBig();
    if (n === null) break;
    const k = readBig();

    let s = readBig();
    let ans = 0n;

    for (let i = 1n; i < n; i++) {
      const p = readBig();
      const req = (100n * p + k - 1n) / k;
      if (s < req) {
        const diff = req - s;
        ans += diff;
        s = req;
      }
      s += p;
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
