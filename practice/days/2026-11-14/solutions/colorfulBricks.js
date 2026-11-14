const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  const k = parseInt(input[2], 10);

  const MOD = 998244353n;

  const C = Array.from({ length: n }, () => new BigInt64Array(n));
  for (let i = 0; i < n; i++) {
    C[i][0] = 1n;
    for (let j = 1; j <= i; j++) {
      C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
    }
  }

  let ans = BigInt(m);
  ans = (ans * C[n - 1][k]) % MOD;

  let mul = BigInt(m - 1);
  for (let i = 0; i < k; i++) {
    ans = (ans * mul) % MOD;
  }

  console.log(ans.toString());
}

solve();
