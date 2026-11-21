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
  const tVal = nextInt();
  if (tVal === null) return;
  const T = tVal;
  const MOD = 998244353n;
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = nextInt();
    const parent = new Int32Array(n + 1);
    const depth = new Int32Array(n + 1);
    const byDepth = [[]];
    let maxD = 0;
    depth[1] = 0;
    byDepth[0].push(1);
    for (let i = 2; i <= n; i++) {
      const p = nextInt();
      parent[i] = p;
      const d = depth[p] + 1;
      depth[i] = d;
      if (d > maxD) {
        maxD = d;
        while (byDepth.length <= maxD) byDepth.push([]);
      }
      byDepth[d].push(i);
    }
    const dp = new BigInt64Array(n + 1);
    dp[1] = 1n;
    let prevSum = 1n;
    if (byDepth.length > 1) {
      for (const v of byDepth[1]) {
        dp[v] = 1n;
      }
    }
    for (let d = 2; d <= maxD; d++) {
      let curLevelSum = 0n;
      for (const u of byDepth[d - 1]) curLevelSum = (curLevelSum + dp[u]) % MOD;
      for (const v of byDepth[d]) {
        const p = parent[v];
        let ways = (curLevelSum - dp[p]) % MOD;
        if (ways < 0n) ways += MOD;
        dp[v] = ways;
      }
    }
    let total = 0n;
    for (let i = 1; i <= n; i++) total = (total + dp[i]) % MOD;
    out.push(total.toString());
  }
  console.log(out.join('\n'));
}
solve();