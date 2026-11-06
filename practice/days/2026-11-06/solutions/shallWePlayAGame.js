const fs = require('fs');

function power(base, exp, mod) {
  let res = 1n;
  base = base % mod;
  while (exp > 0n) {
    if ((exp & 1n) === 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const MOD = 998244353n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    if (n % 2n === 1n) {
      const ans = power(2n, n - 1n, MOD);
      out.push(ans.toString());
    } else {
      const ans = (3n * power(2n, n - 2n, MOD)) % MOD;
      out.push(ans.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();

