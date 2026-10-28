const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const head = new Int32Array(n + 1).fill(-1);
  const to = new Int32Array(2 * n + 2);
  const nxt = new Int32Array(2 * n + 2);
  let edgeCount = 0;

  function addEdge(u, v) {
    to[edgeCount] = v;
    nxt[edgeCount] = head[u];
    head[u] = edgeCount++;
    to[edgeCount] = u;
    nxt[edgeCount] = head[v];
    head[v] = edgeCount++;
  }

  for (let i = 1; i <= n; i++) {
    const p = parseInt(tokens[i], 10);
    addEdge(i, p);
  }

  const visited = new Uint8Array(n + 1);
  const queue = new Int32Array(n + 1);
  let components = 0;

  for (let i = 1; i <= n; i++) {
    if (visited[i]) continue;
    components++;
    let qHead = 0, qTail = 0;
    queue[qTail++] = i;
    visited[i] = 1;
    while (qHead < qTail) {
      const u = queue[qHead++];
      for (let e = head[u]; e !== -1; e = nxt[e]) {
        const v = to[e];
        if (!visited[v]) {
          visited[v] = 1;
          queue[qTail++] = v;
        }
      }
    }
  }

  console.log(components);
}

solve();

