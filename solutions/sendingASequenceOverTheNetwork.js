const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) a[i] = parseInt(tokens[ptr++], 10);
    const dp = new Uint8Array(n + 1);
    dp[0] = 1;
    for (let i = 1; i <= n; i++) {
      if (i - a[i] - 1 >= 0 && dp[i - a[i] - 1]) dp[i] = 1;
      if (dp[i - 1] && i + a[i] <= n) dp[i + a[i]] = 1;
    }
    out.push(dp[n] ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}
