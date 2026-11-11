const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);
  const MOD = 1000000007;

  let dp = new Int32Array(n + 1);
  let ndp = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    dp[i] = 1;
  }

  for (let len = 2; len <= k; len++) {
    ndp.fill(0);
    for (let d = 1; d <= n; d++) {
      const val = dp[d];
      if (val === 0) continue;
      for (let m = d; m <= n; m += d) {
        let sum = ndp[m] + val;
        if (sum >= MOD) sum -= MOD;
        ndp[m] = sum;
      }
    }
    const tmp = dp;
    dp = ndp;
    ndp = tmp;
  }

  let ans = 0;
  for (let i = 1; i <= n; i++) {
    ans += dp[i];
    if (ans >= MOD) ans -= MOD;
  }

  console.log(ans);
}

solve();
