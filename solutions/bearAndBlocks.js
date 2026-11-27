const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const h = new Int32Array(n);
  for (let i = 0; i < n; i++) h[i] = parseInt(tokens[ptr++], 10);
  const dp = new Int32Array(n);
  dp[0] = 1;
  for (let i = 1; i < n; i++) dp[i] = Math.min(h[i], dp[i - 1] + 1);
  dp[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) dp[i] = Math.min(dp[i], dp[i + 1] + 1);
  let ans = 0;
  for (let i = 0; i < n; i++) if (dp[i] > ans) ans = dp[i];
  console.log(ans);
}
