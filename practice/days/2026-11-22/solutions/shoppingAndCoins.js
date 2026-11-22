const fs = require('fs');
function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const T = nextInt();
  if (T === null) return;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const h = new Int32Array(n);
    let maxCost = 0;
    for (let i = 0; i < n; i++) {
      h[i] = nextInt();
      if (2 * h[i] > maxCost) maxCost = 2 * h[i];
    }
    const k = new Int32Array(n);
    for (let i = 0; i < n; i++) k[i] = nextInt();
    const dp = new Int32Array(maxCost + 1).fill(1e9);
    dp[0] = 0;
    for (let i = 0; i < n; i++) {
      const coin = k[i];
      for (let x = coin; x <= maxCost; x++) {
        if (dp[x - coin] + 1 < dp[x]) {
          dp[x] = dp[x - coin] + 1;
        }
      }
    }
    let totalCoins = 0;
    for (let i = 0; i < n; i++) {
      totalCoins += dp[2 * h[i]];
    }
    out.push(totalCoins);
  }
  console.log(out.join('\n'));
}
solve();