const fs = require('fs');

function solve() {
  const token = fs.readFileSync(0, 'utf-8').trim().split(/\s+/)[0];
  if (!token) return;
  const n = BigInt(token);
  const MOD = 1000000007n;

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

  const total = modPow(27n, n, MOD);
  const invalid = modPow(7n, n, MOD);
  const ans = (total - invalid + MOD) % MOD;

  console.log(ans.toString());
}

solve();
