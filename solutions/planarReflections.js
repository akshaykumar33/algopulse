const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const MOD = 1000000007;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);

    if (k === 1) {
      out.push(1);
      continue;
    }

    const dp = Array.from({ length: 2 }, () =>
      Array.from({ length: k + 1 }, () => new Int32Array(n + 2))
    );

    for (let i = 1; i <= n; i++) {
      dp[0][1][i] = 1;
      dp[1][1][i] = 1;
    }

    for (let p = 2; p <= k; p++) {
      for (let i = n; i >= 1; i--) {
        const right = i < n ? dp[1][p][i + 1] : 1;
        const left = i > 1 ? dp[0][p - 1][i - 1] : 1;
        dp[1][p][i] = (right + left) % MOD;
      }
      for (let i = 1; i <= n; i++) {
        const left = i > 1 ? dp[0][p][i - 1] : 1;
        const right = i < n ? dp[1][p - 1][i + 1] : 1;
        dp[0][p][i] = (left + right) % MOD;
      }
    }

    out.push(dp[1][k][1]);
  }

  console.log(out.join('\n'));
}

solve();
