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
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    a.sort();
    const pairs = [];
    let square = -1;
    for (let i = 0; i < n - 1; i++) {
      if (a[i] === a[i + 1]) {
        if (i + 3 < n && a[i] === a[i + 3]) {
          square = a[i];
          break;
        }
        pairs.push(a[i]);
        i++;
      }
    }
    if (square !== -1) {
      out.push(square + ' ' + square + ' ' + square + ' ' + square);
      continue;
    }
    let bestA = pairs[0], bestB = pairs[1];
    let bestNum = BigInt(bestA + bestB) * BigInt(bestA + bestB);
    let bestDen = BigInt(bestA) * BigInt(bestB);
    for (let i = 0; i < pairs.length - 1; i++) {
      const u = pairs[i], v = pairs[i + 1];
      const curNum = BigInt(u + v) * BigInt(u + v);
      const curDen = BigInt(u) * BigInt(v);
      if (curNum * bestDen < bestNum * curDen) {
        bestNum = curNum;
        bestDen = curDen;
        bestA = u;
        bestB = v;
      }
    }
    out.push(bestA + ' ' + bestA + ' ' + bestB + ' ' + bestB);
  }
  console.log(out.join('\n'));
}

solve();
