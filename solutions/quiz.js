const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;

  const n = BigInt(input[0]);
  const m = BigInt(input[1]);
  const k = BigInt(input[2]);
  const MOD = 1000000009n;

  const wrong = n - m;

  if ((wrong + 1n) * (k - 1n) >= m) {
    const ans = m % MOD;
    console.log(ans.toString());
    return;
  }

  const consecutive = m - wrong * (k - 1n);
  const t = consecutive / k;

  function modPow(base, exp) {
    let res = 1n;
    base = base % MOD;
    while (exp > 0n) {
      if (exp & 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp >>= 1n;
    }
    return res;
  }

  const powVal = modPow(2n, t + 1n);
  const doubledPart = (powVal - 2n + MOD) % MOD;
  const ans = (doubledPart * k + (m - t * k)) % MOD;

  console.log(ans.toString());
}

solve();
