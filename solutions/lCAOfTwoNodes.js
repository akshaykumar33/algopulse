const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let num = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10 + (buffer[offset] - 48);
      offset++;
    }
    return num;
  }

  const n = readInt();
  if (n === null) return;
  const targetU = readInt();
  const targetV = readInt();

  const head = new Int32Array(n + 1).fill(-1);
  const to = new Int32Array(2 * n);
  const next = new Int32Array(2 * n);
  let edgeCount = 0;

  function addEdge(u, v) {
    to[edgeCount] = v;
    next[edgeCount] = head[u];
    head[u] = edgeCount++;
  }

  for (let i = 0; i < n - 1; i++) {
    const u = readInt();
    const v = readInt();
    addEdge(u, v);
    addEdge(v, u);
  }

  const parent = new Int32Array(n + 1);
  const depth = new Int32Array(n + 1);
  const queue = new Int32Array(n + 1);
  let qHead = 0;
  let qTail = 0;

  queue[qTail++] = 1;
  parent[1] = 0;
  depth[1] = 0;

  const visited = new Uint8Array(n + 1);
  visited[1] = 1;

  while (qHead < qTail) {
    const u = queue[qHead++];
    const d = depth[u] + 1;
    for (let e = head[u]; e !== -1; e = next[e]) {
      const v = to[e];
      if (!visited[v]) {
        visited[v] = 1;
        parent[v] = u;
        depth[v] = d;
        queue[qTail++] = v;
      }
    }
  }

  let u = targetU;
  let v = targetV;

  while (depth[u] > depth[v]) {
    u = parent[u];
  }
  while (depth[v] > depth[u]) {
    v = parent[v];
  }
  while (u !== v) {
    u = parent[u];
    v = parent[v];
  }

  console.log(u.toString());
}

solve();
