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
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const adj = [];
    for (let i = 0; i <= n; i++) adj.push([]);
    for (let i = 0; i < n - 1; i++) {
      const u = nextInt(), v = nextInt();
      adj[u].push(v);
      adj[v].push(u);
    }
    const children = [];
    for (let i = 0; i <= n; i++) children.push([]);
    const parent = new Int32Array(n + 1);
    const order = new Int32Array(n);
    let head = 0, tail = 0;
    order[tail++] = 1;
    parent[1] = 0;
    while (head < tail) {
      const u = order[head++];
      for (const v of adj[u]) {
        if (v !== parent[u]) {
          parent[v] = u;
          children[u].push(v);
          order[tail++] = v;
        }
      }
    }
    const sz = new Int32Array(n + 1);
    const dp = new Int32Array(n + 1);
    for (let i = n - 1; i >= 0; i--) {
      const u = order[i];
      sz[u] = 1;
      const ch = children[u];
      for (const v of ch) sz[u] += sz[v];
      if (ch.length === 0) {
        dp[u] = 0;
      } else if (ch.length === 1) {
        dp[u] = sz[ch[0]] - 1;
      } else {
        const l = ch[0], r = ch[1];
        dp[u] = Math.max(sz[l] - 1 + dp[r], sz[r] - 1 + dp[l]);
      }
    }
    out.push(dp[1]);
  }
  console.log(out.join('\n'));
}
solve();