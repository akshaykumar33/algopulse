const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function nextInt() {
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

  const n = nextInt();
  if (n === null) return;
  const t = nextInt();

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
    const u = nextInt();
    const v = nextInt();
    addEdge(u, v);
  }

  const parent = new Int32Array(n + 1);
  const vis = new Uint8Array(n + 1);
  const order = new Int32Array(n);
  const win = new Uint8Array(n + 1);
  const out = [];

  for (let q = 0; q < t; q++) {
    const root = nextInt();
    vis.fill(0);
    order[0] = root;
    vis[root] = 1;
    parent[root] = 0;
    let bfsHead = 0;
    let bfsTail = 1;

    while (bfsHead < bfsTail) {
      const u = order[bfsHead++];
      for (let e = head[u]; e !== -1; e = next[e]) {
        const v = to[e];
        if (!vis[v]) {
          vis[v] = 1;
          parent[v] = u;
          order[bfsTail++] = v;
        }
      }
    }

    for (let i = n - 1; i >= 0; i--) {
      const u = order[i];
      let canWin = 0;
      for (let e = head[u]; e !== -1; e = next[e]) {
        const v = to[e];
        if (v !== parent[u] && win[v] === 0) {
          canWin = 1;
          break;
        }
      }
      win[u] = canWin;
    }

    out.push(win[root] === 1 ? 'Ron' : 'Hermione');
  }

  console.log(out.join('\n'));
}

solve();
