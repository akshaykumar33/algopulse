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
    const nBig = readBig();
    if (nBig === null) break;
    const n = Number(nBig);
    const h = readBig();
    const k = readBig();

    const a = new BigInt64Array(n);
    let totalSum = 0n;
    for (let i = 0; i < n; i++) {
      a[i] = readBig();
      totalSum += a[i];
    }

    const r = (h - 1n) / totalSum;
    const rem = h - r * totalSum;

    const leftMin = new BigInt64Array(n);
    leftMin[0] = a[0];
    for (let i = 1; i < n; i++) {
      leftMin[i] = a[i] < leftMin[i - 1] ? a[i] : leftMin[i - 1];
    }

    const rightMax = new BigInt64Array(n);
    rightMax[n - 1] = a[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      rightMax[i] = a[i] > rightMax[i + 1] ? a[i] : rightMax[i + 1];
    }

    let pref = 0n;
    let bestM = BigInt(n);

    for (let m = 1; m < n; m++) {
      pref += a[m - 1];
      const diff = rightMax[m] - leftMin[m - 1];
      const maxDmg = pref + (diff > 0n ? diff : 0n);
      if (maxDmg >= rem) {
        bestM = BigInt(m);
        break;
      }
    }

    const ans = r * (BigInt(n) + k) + bestM;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
