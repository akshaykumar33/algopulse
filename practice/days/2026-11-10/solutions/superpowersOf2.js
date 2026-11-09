const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const t = parseInt(tokens[0], 10);

  const MOD = 1000000007n;
  const W = new BigInt64Array(20);

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

  let curPow10 = 1n;
  for (let i = 0; i < 20; i++) {
    W[i] = modPow(2n, 2n * curPow10, MOD);
    curPow10 = curPow10 * 10n;
  }

  const out = [];
  for (let i = 1; i <= t; i++) {
    let n = parseInt(tokens[i], 10);
    let ans = 1n;
    let bit = 0;
    while (n > 0) {
      if (n & 1) {
        ans = (ans * W[bit]) % MOD;
      }
      n >>= 1;
      bit++;
    }
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
