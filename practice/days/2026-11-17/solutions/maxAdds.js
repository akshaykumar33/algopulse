const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let num = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10 + (buffer[offset] - 48);
      offset++;
    }
    return num;
  }

  const T = readInt();
  if (T === null) return;
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = readInt();
    const m = readInt();
    if (n === null) break;

    const a = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = readInt();
    }
    const b = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      b[i] = readInt();
    }

    let prefixB = 0;
    let maxDiff = -Infinity;
    for (let i = 0; i < n; i++) {
      prefixB += b[i];
      const diff = a[i] - prefixB;
      if (diff > maxDiff) {
        maxDiff = diff;
      }
    }

    const BigM = BigInt(m);
    const BigSN = BigInt(Math.round(prefixB));
    let totalMax = 0n;

    if (maxDiff <= 0) {
      totalMax = (BigM * (BigM + 1n)) / 2n;
    } else {
      const k = BigInt(Math.floor(maxDiff));
      if (k >= BigM) {
        totalMax = BigM * k;
      } else {
        const sum1 = k * k;
        const sum2 = (BigM * (BigM + 1n)) / 2n - (k * (k + 1n)) / 2n;
        totalMax = sum1 + sum2;
      }
    }

    const ans = totalMax + BigM * BigSN;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
