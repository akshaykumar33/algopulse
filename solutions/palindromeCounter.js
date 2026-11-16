const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  const s = input[0];
  const n = s.length;
  const mod = 1000000007;

  const dp = Array.from({ length: n }, () => new Int32Array(n));

  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      if (s[i] === s[j]) {
        dp[i][j] = (dp[i + 1][j] + dp[i][j - 1] + 1) % mod;
      } else {
        dp[i][j] = (dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1] + mod) % mod;
      }
    }
  }

  console.log(dp[0][n - 1]);
}

solve();
