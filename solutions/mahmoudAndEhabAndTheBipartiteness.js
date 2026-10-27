const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);

  const head = new Int32Array(n + 1).fill(-1);
  const to = new Int32Array(2 * n);
  const next = new Int32Array(2 * n);
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
    const u = parseInt(tokens[ptr++], 10);
    const v = parseInt(tokens[ptr++], 10);
    addEdge(u, v);
  }

  const color = new Int8Array(n + 1).fill(-1);
  const queue = new Int32Array(n);
  let qh = 0;
  let qt = 0;

  color[1] = 0;
  queue[qt++] = 1;
  let cnt0 = 0;
  let cnt1 = 0;

  while (qh < qt) {
    const u = queue[qh++];
    if (color[u] === 0) cnt0++;
    else cnt1++;

    const nextColor = color[u] ^ 1;
    for (let e = head[u]; e !== -1; e = next[e]) {
      const v = to[e];
      if (color[v] === -1) {
        color[v] = nextColor;
        queue[qt++] = v;
      }
    }
  }

  const ans = BigInt(cnt0) * BigInt(cnt1) - BigInt(n - 1);
  console.log(ans.toString());
}

solve();
