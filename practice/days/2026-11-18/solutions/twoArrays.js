const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;
  const m = nextInt();

  const MOD = 1000000007n;
  const N = n + 2 * m - 1;
  const K = 2 * m;

  let num = 1n;
  let den = 1n;

  for (let i = 1; i <= K; i++) {
    num = (num * BigInt(N - i + 1)) % MOD;
    den = (den * BigInt(i)) % MOD;
  }

  function modPow(base, exp) {
    let res = 1n;
    base = base % MOD;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp /= 2n;
    }
    return res;
  }

  const ans = (num * modPow(den, MOD - 2n)) % MOD;
  console.log(ans.toString());
}

solve();
