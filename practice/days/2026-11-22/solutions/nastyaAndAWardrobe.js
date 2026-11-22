const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;
  const x = BigInt(input[0]);
  const k = BigInt(input[1]);
  const MOD = 1000000007n;
  if (x === 0n) {
    console.log(0);
    return;
  }
  function power(base, exp) {
    let res = 1n;
    base = base % MOD;
    while (exp > 0n) {
      if (exp & 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp >>= 1n;
    }
    return res;
  }
  const p2k1 = power(2n, k + 1n);
  const p2k = power(2n, k);
  const term1 = (p2k1 * (x % MOD)) % MOD;
  const ans = (term1 - p2k + 1n + MOD) % MOD;
  console.log(ans.toString());
}
solve();