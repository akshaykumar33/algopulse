const fs = require('fs');

function solve() {
  const data = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (data.length === 0 || data[0] === '') return;
  let ptr = 0;
  const n = parseInt(data[ptr++], 10);
  const m = parseInt(data[ptr++], 10);

  const head = new Int32Array(n + 1).fill(-1);
  const to = new Int32Array(2 * m);
  const nxt = new Int32Array(2 * m);
  for (let i = 0; i < m; i++) {
    const u = parseInt(data[ptr++], 10);
    const v = parseInt(data[ptr++], 10);
    const e0 = 2 * i;
    const e1 = e0 + 1;
    to[e0] = v;
    nxt[e0] = head[u];
    head[u] = e0;
    to[e1] = u;
    nxt[e1] = head[v];
    head[v] = e1;
  }

  const tin = new Int32Array(n + 1);
  const low = new Int32Array(n + 1);
  const curEdge = new Int32Array(n + 1);
  const parNode = new Int32Array(n + 1);
  const parEdge = new Int32Array(n + 1).fill(-1);
  const isBridge = new Uint8Array(m);

  const st = new Int32Array(n + 5);
  let top = 0;
  let timer = 0;

  tin[1] = low[1] = ++timer;
  curEdge[1] = head[1];
  st[top++] = 1;

  while (top > 0) {
    const u = st[top - 1];
    const e = curEdge[u];
    if (e !== -1) {
      curEdge[u] = nxt[e];
      const eid = e >> 1;
      if (eid === parEdge[u]) continue;
      const v = to[e];
      if (tin[v] !== 0) {
        if (tin[v] < low[u]) low[u] = tin[v];
      } else {
        parNode[v] = u;
        parEdge[v] = eid;
        tin[v] = low[v] = ++timer;
        curEdge[v] = head[v];
        st[top++] = v;
      }
    } else {
      top--;
      const p = parNode[u];
      if (p !== 0) {
        if (low[u] < low[p]) low[p] = low[u];
        if (low[u] > tin[p]) isBridge[parEdge[u]] = 1;
      }
    }
  }

  const comp = new Int32Array(n + 1).fill(-1);
  let numC = 0;
  const q = new Int32Array(n + 5);
  for (let i = 1; i <= n; i++) {
    if (comp[i] !== -1) continue;
    comp[i] = numC;
    let qh = 0;
    let qt = 0;
    q[qt++] = i;
    while (qh < qt) {
      const u = q[qh++];
      for (let e = head[u]; e !== -1; e = nxt[e]) {
        if (isBridge[e >> 1]) continue;
        const v = to[e];
        if (comp[v] === -1) {
          comp[v] = numC;
          q[qt++] = v;
        }
      }
    }
    numC++;
  }

  const tHead = new Int32Array(numC).fill(-1);
  const tTo = new Int32Array(2 * numC);
  const tNxt = new Int32Array(2 * numC);
  let te = 0;
  for (let i = 0; i < m; i++) {
    if (!isBridge[i]) continue;
    const cu = comp[to[2 * i + 1]];
    const cv = comp[to[2 * i]];
    tTo[te] = cv;
    tNxt[te] = tHead[cu];
    tHead[cu] = te++;
    tTo[te] = cu;
    tNxt[te] = tHead[cv];
    tHead[cv] = te++;
  }

  const LOG = 17;
  const depth = new Int32Array(numC);
  const vis = new Uint8Array(numC);
  const up = new Int32Array(LOG * numC);
  let qh = 0;
  let qt = 0;
  q[qt++] = 0;
  vis[0] = 1;
  up[0] = 0;
  while (qh < qt) {
    const u = q[qh++];
    for (let e = tHead[u]; e !== -1; e = tNxt[e]) {
      const v = tTo[e];
      if (!vis[v]) {
        vis[v] = 1;
        depth[v] = depth[u] + 1;
        up[v] = u;
        q[qt++] = v;
      }
    }
  }
  for (let j = 1; j < LOG; j++) {
    const prevOff = (j - 1) * numC;
    const curOff = j * numC;
    for (let v = 0; v < numC; v++) {
      up[curOff + v] = up[prevOff + up[prevOff + v]];
    }
  }

  function lca(u, v) {
    if (depth[u] < depth[v]) {
      const tmp = u;
      u = v;
      v = tmp;
    }
    const diff = depth[u] - depth[v];
    for (let j = 0; j < LOG; j++) {
      if ((diff >> j) & 1) u = up[j * numC + u];
    }
    if (u === v) return u;
    for (let j = LOG - 1; j >= 0; j--) {
      const off = j * numC;
      if (up[off + u] !== up[off + v]) {
        u = up[off + u];
        v = up[off + v];
      }
    }
    return up[u];
  }

  const k = parseInt(data[ptr++], 10);
  const out = [];
  for (let i = 0; i < k; i++) {
    const s = comp[parseInt(data[ptr++], 10)];
    const l = comp[parseInt(data[ptr++], 10)];
    const w = lca(s, l);
    out.push(depth[s] + depth[l] - 2 * depth[w]);
  }
  console.log(out.join('\n'));
}

solve();
