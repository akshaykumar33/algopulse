const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  const coins = [1, 3, 6, 10, 15];
  const dp = new Array(120).fill(1e9);
  dp[0] = 0;
  for (let i = 1; i < 120; i++) {
    for (const c of coins) {
      if (i >= c) {
        dp[i] = Math.min(dp[i], dp[i - c] + 1);
      }
    }
  }
  const out = [];
  for (let i = 1; i <= t; i++) {
    const n = parseInt(input[i], 10);
    let ans = 1e9;
    const k = Math.floor(n / 15);
    for (let j = Math.max(0, k - 5); j <= k; j++) {
      const rem = n - j * 15;
      if (rem >= 0 && rem < 120) {
        ans = Math.min(ans, j + dp[rem]);
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
