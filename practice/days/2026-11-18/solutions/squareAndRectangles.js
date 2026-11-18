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

  const nVal = nextInt();
  if (nVal === null) return;
  const n = nVal;

  let minX = 1e9, maxX = -1e9;
  let minY = 1e9, maxY = -1e9;
  let totalArea = 0n;

  for (let i = 0; i < n; i++) {
    const x1 = nextInt();
    const y1 = nextInt();
    const x2 = nextInt();
    const y2 = nextInt();

    if (x1 < minX) minX = x1;
    if (x2 > maxX) maxX = x2;
    if (y1 < minY) minY = y1;
    if (y2 > maxY) maxY = y2;

    totalArea += BigInt(x2 - x1) * BigInt(y2 - y1);
  }

  const w = BigInt(maxX - minX);
  const h = BigInt(maxY - minY);

  if (w === h && w * h === totalArea) {
    console.log('YES');
  } else {
    console.log('NO');
  }
}

solve();
