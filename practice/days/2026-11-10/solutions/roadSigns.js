const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const t = parseInt(tokens[0], 10);
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

  const out = [];
  for (let i = 1; i <= t; i++) {
    const k = BigInt(tokens[i]);
    const ans = (5n * modPow(2n, k, MOD)) % MOD;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
