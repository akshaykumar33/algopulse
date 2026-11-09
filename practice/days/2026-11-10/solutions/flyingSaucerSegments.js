const fs = require('fs');

function modPow(base, exp, mod) {
  let res = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const n = BigInt(tokens[0]);
  const m = BigInt(tokens[1]);

  const p = modPow(3n, n, m);
  const ans = (p - 1n + m) % m;
  console.log(ans.toString());
}

solve();
