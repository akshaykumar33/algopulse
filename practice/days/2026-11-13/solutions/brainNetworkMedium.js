const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;
  const m = nextInt();

  const head = new Int32Array(n + 1).fill(-1);
  const to = new Int32Array(2 * m);
  const next = new Int32Array(2 * m);
  let edgeCount = 0;

  function addEdge(u, v) {
    to[edgeCount] = v;
    next[edgeCount] = head[u];
    head[u] = edgeCount++;
  }

  for (let i = 0; i < m; i++) {
    const u = nextInt();
    const v = nextInt();
    addEdge(u, v);
    addEdge(v, u);
  }

  const dist = new Int32Array(n + 1);
  const queue = new Int32Array(n + 1);

  function bfs(start) {
    dist.fill(-1);
    dist[start] = 0;
    let qh = 0;
    let qt = 0;
    queue[qt++] = start;
    let farthest = start;

    while (qh < qt) {
      const u = queue[qh++];
      if (dist[u] > dist[farthest]) {
        farthest = u;
      }
      for (let e = head[u]; e !== -1; e = next[e]) {
        const v = to[e];
        if (dist[v] === -1) {
          dist[v] = dist[u] + 1;
          queue[qt++] = v;
        }
      }
    }

    return { node: farthest, distance: dist[farthest] };
  }

  const first = bfs(1);
  const second = bfs(first.node);

  console.log(second.distance);
}

solve();
