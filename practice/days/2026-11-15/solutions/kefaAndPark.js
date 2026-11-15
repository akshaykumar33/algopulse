const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const hasCat = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) hasCat[i] = parseInt(input[ptr++], 10);

  const head = new Int32Array(n + 1).fill(-1);
  const next = new Int32Array(2 * n + 5);
  const to = new Int32Array(2 * n + 5);
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
    addEdge(parseInt(input[ptr++], 10), parseInt(input[ptr++], 10));
  }

  let ans = 0;
  const qNode = new Int32Array(n + 5);
  const qParent = new Int32Array(n + 5);
  const qCats = new Int32Array(n + 5);
  let qh = 0, qt = 0;

  qNode[qt] = 1;
  qParent[qt] = 0;
  qCats[qt++] = hasCat[1];

  while (qh < qt) {
    const u = qNode[qh];
    const p = qParent[qh];
    const c = qCats[qh++];

    if (c > m) continue;

    let isLeaf = true;
    for (let e = head[u]; e !== -1; e = next[e]) {
      const v = to[e];
      if (v !== p) {
        isLeaf = false;
        qNode[qt] = v;
        qParent[qt] = u;
        qCats[qt++] = hasCat[v] ? c + 1 : 0;
      }
    }

    if (isLeaf && u !== 1) ans++;
  }

  console.log(ans);
}

solve();
