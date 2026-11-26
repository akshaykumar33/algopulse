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
    const n = Number(nextBigInt());
    const k = nextBigInt();
    let l = nextBigInt() - 1n;

    const digits = new Array(n).fill(1);
    for (let i = n - 1; i >= 0 && l > 0n; i--) {
      digits[i] = Number(l % k) + 1;
      l /= k;
    }
    out.push(digits.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
