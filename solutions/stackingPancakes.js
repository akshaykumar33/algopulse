const fs = require('fs');
const MOD = 1000000007n;
const MAX = 1005;
const dp = Array.from({ length: MAX }, () => new BigInt64Array(MAX));
dp[1][1] = 1n;
const ans = new Array(MAX);
ans[1] = 1n;

for (let i = 1; i < MAX - 1; i++) {
  let sum = 0n;
  for (let j = 1; j <= i; j++) {
    if (dp[i][j] === 0n) continue;
    dp[i + 1][j] = (dp[i + 1][j] + dp[i][j] * BigInt(j)) % MOD;
    dp[i + 1][j + 1] = (dp[i + 1][j + 1] + dp[i][j]) % MOD;
  }
  for (let j = 1; j <= i + 1; j++) sum = (sum + dp[i + 1][j]) % MOD;
  ans[i + 1] = sum;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    out.push(ans[n].toString());
  }
  console.log(out.join('\n'));
}
solve();