const fs = require('fs');

function gcd(a, b) {
  while (b > 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

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

  const n = readBig();
  if (n === null) return;

  const a = [];
  let mx = 0n;
  for (let i = 0n; i < n; i++) {
    const v = readBig();
    a.push(v);
    if (v > mx) mx = v;
  }

  let g = 0n;
  let totalDiff = 0n;
  for (let i = 0; i < a.length; i++) {
    const d = mx - a[i];
    totalDiff += d;
    g = gcd(g, d);
  }

  const y = totalDiff / g;
  const z = g;

  console.log(`${y} ${z}`);
}

solve();
