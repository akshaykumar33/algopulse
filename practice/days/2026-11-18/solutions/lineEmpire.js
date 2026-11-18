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
    const a = BigInt(nextInt());
    const b = BigInt(nextInt());

    const x = new BigInt64Array(n + 1);
    for (let i = 1; i <= n; i++) x[i] = BigInt(nextInt());

    const suff = new BigInt64Array(n + 2);
    for (let i = n; i >= 1; i--) suff[i] = suff[i + 1] + x[i];

    const bigN = BigInt(n);
    let minCost = -1n;

    for (let i = 0; i <= n; i++) {
      const bigI = BigInt(i);
      const capCost = (a + b) * x[i];
      const remCost = b * (suff[i + 1] - (bigN - bigI) * x[i]);
      const total = capCost + remCost;
      if (minCost === -1n || total < minCost) minCost = total;
    }

    out.push(minCost.toString());
  }

  console.log(out.join('\n'));
}

solve();
