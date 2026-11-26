const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextBigInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const t = nextBigInt();
  if (t === null) return;

  function gcd(a, b) {
    while (b > 0n) {
      let rem = a % b;
      a = b;
      b = rem;
    }
    return a;
  }

  const out = [];

  for (let tc = 0; tc < Number(t); tc++) {
    let a = nextBigInt();
    let b = nextBigInt();

    while (b > 1n) {
      let g = gcd(a, b);
      if (g === 1n) break;
      while (b % g === 0n) b /= g;
      a = g;
    }

    if (b === 1n) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }

  console.log(out.join('\n'));
}

solve();
