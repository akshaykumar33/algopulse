const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;

  if (n % 2 !== 0) {
    console.log(-1);
    return;
  }

  const head = new Int32Array(n + 1).fill(-1);
  const next = new Int32Array(2 * n);
  const to = new Int32Array(2 * n);
  let edgeCount = 0;

  function addEdge(u, v) {
    to[edgeCount] = v;
    next[edgeCount] = head[u];
    head[u] = edgeCount++;
    to[edgeCount] = u;
    next[edgeCount] = head[v];
    head[v] = edgeCount++;
  }

  for (let i = 0; i < n - 1; i++) {
    addEdge(nextInt(), nextInt());
  }

  const parent = new Int32Array(n + 1);
  const order = new Int32Array(n);
  const queue = new Int32Array(n);
  let qh = 0;
  let qt = 0;
  let oIdx = 0;

  queue[qt++] = 1;
  parent[1] = 0;

  while (qh < qt) {
    const u = queue[qh++];
    order[oIdx++] = u;

    let e = head[u];
    while (e !== -1) {
      const v = to[e];
      if (v !== parent[u]) {
        parent[v] = u;
        queue[qt++] = v;
      }
      e = next[e];
    }
  }

  const size = new Int32Array(n + 1).fill(1);
  let ans = 0;

  for (let i = n - 1; i >= 0; i--) {
    const u = order[i];
    const p = parent[u];
    if (p !== 0) {
      size[p] += size[u];
      if (size[u] % 2 === 0) {
        ans++;
      }
    }
  }

  console.log(ans);
}

solve();

