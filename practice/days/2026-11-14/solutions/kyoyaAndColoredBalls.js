const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const k = parseInt(input[0], 10);
  const c = [];
  for (let i = 0; i < k; i++) c.push(parseInt(input[1 + i], 10));

  const MOD = 1000000007n;
  const MAX = 1005;
  const C = Array.from({ length: MAX }, () => new BigInt64Array(MAX));
  for (let i = 0; i < MAX; i++) {
    C[i][0] = 1n;
    for (let j = 1; j <= i; j++) {
      C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
    }
  }

  let ans = 1n;
  let sum = 0;

  for (let i = 0; i < k; i++) {
    const cnt = c[i];
    sum += cnt;
    ans = (ans * C[sum - 1][cnt - 1]) % MOD;
  }

  console.log(ans.toString());
}

solve();
