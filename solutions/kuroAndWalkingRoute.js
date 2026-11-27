const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const x = parseInt(tokens[ptr++], 10);
  const y = parseInt(tokens[ptr++], 10);
  const head = new Int32Array(n + 1).fill(-1);
  const next = new Int32Array(2 * n);
  const to = new Int32Array(2 * n);
  let edgeCount = 0;
  function addEdge(u, v) {
    to[edgeCount] = v; next[edgeCount] = head[u]; head[u] = edgeCount++;
    to[edgeCount] = u; next[edgeCount] = head[v]; head[v] = edgeCount++;
  }
  for (let i = 0; i < n - 1; i++) {
    addEdge(parseInt(tokens[ptr++], 10), parseInt(tokens[ptr++], 10));
  }
  const sz = new Int32Array(n + 1);
  const parent = new Int32Array(n + 1);
  const stack = [x];
  const order = [];
  const vis = new Uint8Array(n + 1);
  vis[x] = 1;
  while (stack.length > 0) {
    const u = stack.pop();
    order.push(u);
    for (let e = head[u]; e !== -1; e = next[e]) {
      const v = to[e];
      if (!vis[v]) {
        vis[v] = 1;
        parent[v] = u;
        stack.push(v);
      }
    }
  }
  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    sz[u] = 1;
    for (let e = head[u]; e !== -1; e = next[e]) {
      const v = to[e];
      if (parent[v] === u) sz[u] += sz[v];
    }
  }
  let curr = y;
  while (parent[curr] !== x) curr = parent[curr];
  const countX = BigInt(n - sz[curr]);
  const countY = BigInt(sz[y]);
  const total = BigInt(n) * BigInt(n - 1);
  console.log((total - countX * countY).toString());
}
