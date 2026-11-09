const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const MOD = 998244353;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const p = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      p[i] = parseInt(tokens[ptr++], 10);
    }

    const blockSizes = [];
    let curMax = 0;
    let curSize = 0;

    for (let i = 0; i < n; i++) {
      if (p[i] > curMax) {
        if (curSize > 0) {
          blockSizes.push(curSize);
        }
        curMax = p[i];
        curSize = 1;
      } else {
        curSize++;
      }
    }
    if (curSize > 0) {
      blockSizes.push(curSize);
    }

    const dp = new Int32Array(n + 1);
    dp[0] = 1;

    for (let i = 0; i < blockSizes.length; i++) {
      const w = blockSizes[i];
      for (let j = n; j >= w; j--) {
        dp[j] = (dp[j] + dp[j - w]) % MOD;
      }
    }

    out.push(dp.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
