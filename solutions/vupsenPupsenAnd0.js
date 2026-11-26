'use strict';
const fs = require('fs');

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sgn = 1;
    if (buf[pos] === 45) {
      sgn = -1;
      pos++;
    }
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sgn;
  }

  const tVal = nextInt();
  if (tVal === null) return;
  let t = tVal;
  const out = [];

  while (t--) {
    const n = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();

    const b = new Int32Array(n);
    let start = 0;

    if (n % 2 === 1) {
      const x = a[0];
      const y = a[1];
      const z = a[2];
      if (x + y !== 0) {
        const g = gcd(z, x + y);
        b[0] = -z / g;
        b[1] = -z / g;
        b[2] = (x + y) / g;
      } else if (y + z !== 0) {
        const g = gcd(x, y + z);
        b[1] = -x / g;
        b[2] = -x / g;
        b[0] = (y + z) / g;
      } else {
        const g = gcd(y, x + z);
        b[0] = -y / g;
        b[2] = -y / g;
        b[1] = (x + z) / g;
      }
      start = 3;
    }

    for (let i = start; i < n; i += 2) {
      const x = a[i];
      const y = a[i + 1];
      const g = gcd(x, y);
      b[i] = -y / g;
      b[i + 1] = x / g;
    }

    out.push(b.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
