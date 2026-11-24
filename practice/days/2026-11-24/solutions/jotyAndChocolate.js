const fs = require('fs');

function gcd(a, b) {
  while (b > 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

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
  const n = nextBigInt();
  if (n === null) return;
  const a = nextBigInt();
  const b = nextBigInt();
  const p = nextBigInt();
  const q = nextBigInt();
  const g = gcd(a, b);
  const lcm = (a / g) * b;
  const ca = n / a;
  const cb = n / b;
  const cab = n / lcm;
  const onlyA = ca - cab;
  const onlyB = cb - cab;
  const maxP = p > q ? p : q;
  const ans = onlyA * p + onlyB * q + cab * maxP;
  console.log(ans.toString());
}

solve();
