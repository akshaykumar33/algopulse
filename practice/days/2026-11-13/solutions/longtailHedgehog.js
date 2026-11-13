const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;
  const m = nextInt();

  const deg = new Int32Array(n + 1);
  const head = new Int32Array(n + 1).fill(-1);
  const next = new Int32Array(m);
  const to = new Int32Array(m);
  let edgeCount = 0;

  for (let i = 0; i < m; i++) {
    const u = nextInt();
    const v = nextInt();
    deg[u]++;
    deg[v]++;
    if (u < v) {
      to[edgeCount] = u;
      next[edgeCount] = head[v];
      head[v] = edgeCount++;
    } else {
      to[edgeCount] = v;
      next[edgeCount] = head[u];
      head[u] = edgeCount++;
    }
  }

  const dp = new Int32Array(n + 1);
  let maxBeauty = 0n;

  for (let u = 1; u <= n; u++) {
    let maxPrev = 0;
    for (let e = head[u]; e !== -1; e = next[e]) {
      const v = to[e];
      if (dp[v] > maxPrev) {
        maxPrev = dp[v];
      }
    }
    dp[u] = maxPrev + 1;
    const beauty = BigInt(dp[u]) * BigInt(deg[u]);
    if (beauty > maxBeauty) {
      maxBeauty = beauty;
    }
  }

  console.log(maxBeauty.toString());
}

solve();
