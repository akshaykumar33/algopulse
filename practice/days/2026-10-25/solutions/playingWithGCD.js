const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) offset++;
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  function gcd(a, b) {
    while (b !== 0) {
      const t = a % b;
      a = b;
      b = t;
    }
    return a;
  }

  function lcm(a, b) {
    return Math.floor(a / gcd(a, b)) * b;
  }

  const t = readInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = readInt();
    if (n === null) break;
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = readInt();

    const b = new Int32Array(n + 1);
    b[0] = a[0];
    for (let i = 1; i < n; i++) {
      b[i] = lcm(a[i - 1], a[i]);
    }
    b[n] = a[n - 1];

    let ok = true;
    for (let i = 0; i < n; i++) {
      if (gcd(b[i], b[i + 1]) !== a[i]) {
        ok = false;
        break;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
