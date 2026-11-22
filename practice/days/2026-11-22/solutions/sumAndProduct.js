const fs = require('fs');

function bigIntSqrt(n) {
  if (n < 0n) return -1n;
  if (n === 0n) return 0n;
  let x = n;
  let y = (x + 1n) / 2n;
  while (y < x) {
    x = y;
    y = (x + n / x) / 2n;
  }
  return x * x === n ? x : -1n;
}

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf[pos] === 45) { sign = -1; pos++; }
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }

  function nextBigInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1n;
    if (buf[pos] === 45) { sign = -1n; pos++; }
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }

  const t = nextInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const countMap = new Map();
    for (let i = 0; i < n; i++) {
      const a = nextInt();
      countMap.set(a, (countMap.get(a) || 0) + 1);
    }

    const q = nextInt();
    const resRow = [];
    for (let qi = 0; qi < q; qi++) {
      const b = nextBigInt();
      const c = nextBigInt();

      const D = b * b - 4n * c;
      const sD = bigIntSqrt(D);

      if (sD === -1n) {
        resRow.push('0');
        continue;
      }

      if ((b - sD) % 2n !== 0n) {
        resRow.push('0');
        continue;
      }
      
      const x1 = Number((b - sD) / 2n);
      const x2 = Number((b + sD) / 2n);

      const c1 = BigInt(countMap.get(x1) || 0);
      const c2 = BigInt(countMap.get(x2) || 0);

      if (x1 === x2) {
        resRow.push(((c1 * (c1 - 1n)) / 2n).toString());
      } else {
        resRow.push((c1 * c2).toString());
      }
    }
    out.push(resRow.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
