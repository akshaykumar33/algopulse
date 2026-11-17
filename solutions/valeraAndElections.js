const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);

  const head = new Int32Array(n + 1).fill(-1);
  const to = new Int32Array(2 * n);
  const nxt = new Int32Array(2 * n);
  const type = new Int32Array(2 * n);
  let edgeCount = 0;

  function addEdge(u, v, t) {
    to[edgeCount] = v;
    type[edgeCount] = t;
    nxt[edgeCount] = head[u];
    head[u] = edgeCount++;
  }

  for (let i = 0; i < n - 1; i++) {
    const u = parseInt(tokens[ptr++], 10);
    const v = parseInt(tokens[ptr++], 10);
    const t = parseInt(tokens[ptr++], 10);
    addEdge(u, v, t);
    addEdge(v, u, t);
  }

  const parent = new Int32Array(n + 1).fill(-1);
  const parentType = new Int32Array(n + 1);
  const order = new Int32Array(n);
  let orderPtr = 0;
  const q = new Int32Array(n);
  let qHead = 0;
  let qTail = 0;

  q[qTail++] = 1;
  parent[1] = 0;

  while (qHead < qTail) {
    const u = q[qHead++];
    order[orderPtr++] = u;
    for (let e = head[u]; e !== -1; e = nxt[e]) {
      const v = to[e];
      if (v !== parent[u]) {
        parent[v] = u;
        parentType[v] = type[e];
        q[qTail++] = v;
      }
    }
  }

  const hasCand = new Uint8Array(n + 1);
  const selected = [];

  for (let i = n - 1; i >= 0; i--) {
    const u = order[i];
    if (parentType[u] === 2 && !hasCand[u]) {
      selected.push(u);
      hasCand[u] = 1;
    }
    if (hasCand[u] && parent[u] > 0) {
      hasCand[parent[u]] = 1;
    }
  }

  const out = [];
  out.push(selected.length);
  if (selected.length > 0) {
    out.push(selected.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
