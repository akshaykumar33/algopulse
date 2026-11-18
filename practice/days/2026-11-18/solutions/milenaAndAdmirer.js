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
  const t = tVal;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();

    let ops = 0n;
    let limit = BigInt(a[n - 1]);

    for (let i = n - 2; i >= 0; i--) {
      const val = BigInt(a[i]);
      if (val > limit) {
        const k = (val + limit - 1n) / limit;
        ops += (k - 1n);
        limit = val / k;
      } else {
        limit = val;
      }
    }

    out.push(ops.toString());
  }

  console.log(out.join('\n'));
}

solve();
