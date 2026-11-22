const fs = require('fs');
function gcd(a, b) {
  while (b > 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}
function power(b, p, mod) {
  let r = 1n;
  b = b % mod;
  while (p > 0n) {
    if (p % 2n === 1n) r = (r * b) % mod;
    b = (b * b) % mod;
    p /= 2n;
  }
  return r;
}
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const MOD = 998244353n;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = BigInt(input[ptr++]);
    const k = BigInt(input[ptr++]);
    const twoK = 1n << k;
    const g = gcd(twoK, n);
    const L = n / g;
    if (L % 3n === 0n) {
      const ans1Bit = power(2n, 2n * g, MOD);
      const totalAns = power(ans1Bit, k, MOD);
      out.push(totalAns.toString());
    } else {
      out.push(1);
    }
  }
  console.log(out.join('\n'));
}
solve();