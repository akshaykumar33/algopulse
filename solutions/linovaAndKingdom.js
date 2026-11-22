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
  const n = nextInt();
  if (n === null) return;
  const k = nextInt();
  const head = new Int32Array(n + 1).fill(-1);
  const to = new Int32Array(2 * n);
  const nxt = new Int32Array(2 * n);
  let edgeCount = 0;
  function addEdge(u, v) {
    to[edgeCount] = v;
    nxt[edgeCount] = head[u];
    head[u] = edgeCount++;
    to[edgeCount] = u;
    nxt[edgeCount] = head[v];
    head[v] = edgeCount++;
  }
  for (let i = 0; i < n - 1; i++) {
    const u = nextInt(), v = nextInt();
    addEdge(u, v);
  }
  const depth = new Int32Array(n + 1);
  const sz = new Int32Array(n + 1);
  const parent = new Int32Array(n + 1);
  const order = new Int32Array(n);
  let headOrder = 0, tailOrder = 0;
  order[tailOrder++] = 1;
  depth[1] = 0;
  parent[1] = 0;
  while (headOrder < tailOrder) {
    const u = order[headOrder++];
    let e = head[u];
    while (e !== -1) {
      const v = to[e];
      if (v !== parent[u]) {
        parent[v] = u;
        depth[v] = depth[u] + 1;
        order[tailOrder++] = v;
      }
      e = nxt[e];
    }
  }
  for (let i = n - 1; i >= 0; i--) {
    const u = order[i];
    sz[u] = 1;
    let e = head[u];
    while (e !== -1) {
      const v = to[e];
      if (v !== parent[u]) sz[u] += sz[v];
      e = nxt[e];
    }
  }
  const gains = new Int32Array(n);
  for (let i = 1; i <= n; i++) {
    gains[i - 1] = depth[i] - (sz[i] - 1);
  }
  gains.sort();
  let ans = 0n;
  for (let i = n - 1; i >= n - k; i--) {
    ans += BigInt(gains[i]);
  }
  console.log(ans.toString());
}
solve();