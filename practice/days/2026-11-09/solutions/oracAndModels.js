const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
      s[i] = parseInt(tokens[ptr++], 10);
    }

    const dp = new Int32Array(n + 1).fill(1);
    let maxLen = 1;

    for (let i = n; i >= 1; i--) {
      for (let j = i + i; j <= n; j += i) {
        if (s[j] > s[i] && dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
        }
      }
      if (dp[i] > maxLen) {
        maxLen = dp[i];
      }
    }

    out.push(maxLen);
  }

  console.log(out.join('\n'));
}

solve();
