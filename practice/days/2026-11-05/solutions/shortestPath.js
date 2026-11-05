const fs = require('fs');

class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(node, d) {
    this.heap.push({ node, d });
    this._up(this.heap.length - 1);
  }
  pop() {
    if (this.heap.length === 0) return null;
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._down(0);
    }
    return top;
  }
  size() {
    return this.heap.length;
  }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[i].d < this.heap[p].d) {
        const t = this.heap[i];
        this.heap[i] = this.heap[p];
        this.heap[p] = t;
        i = p;
      } else {
        break;
      }
    }
  }
  _down(i) {
    const len = this.heap.length;
    while ((i << 1) + 1 < len) {
      let l = (i << 1) + 1;
      const r = l + 1;
      if (r < len && this.heap[r].d < this.heap[l].d) l = r;
      if (this.heap[l].d < this.heap[i].d) {
        const t = this.heap[i];
        this.heap[i] = this.heap[l];
        this.heap[l] = t;
        i = l;
      } else {
        break;
      }
    }
  }
}

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);

  const head = new Int32Array(n + 1).fill(-1);
  const to = new Int32Array(2 * m);
  const next = new Int32Array(2 * m);
  const weight = new Int32Array(2 * m);
  let edgeCount = 0;

  for (let i = 0; i < m; i++) {
    const u = parseInt(tokens[ptr++], 10);
    const v = parseInt(tokens[ptr++], 10);
    const w = parseInt(tokens[ptr++], 10);
    to[edgeCount] = v;
    weight[edgeCount] = w;
    next[edgeCount] = head[u];
    head[u] = edgeCount++;
    to[edgeCount] = u;
    weight[edgeCount] = w;
    next[edgeCount] = head[v];
    head[v] = edgeCount++;
  }

  const dist = new Float64Array(n + 1).fill(Infinity);
  const parent = new Int32Array(n + 1).fill(-1);
  const pq = new MinHeap();

  dist[1] = 0;
  pq.push(1, 0);

  while (pq.size() > 0) {
    const top = pq.pop();
    const u = top.node;
    const d = top.d;
    if (d > dist[u]) continue;
    if (u === n) break;

    for (let e = head[u]; e !== -1; e = next[e]) {
      const v = to[e];
      const w = weight[e];
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        parent[v] = u;
        pq.push(v, dist[v]);
      }
    }
  }

  if (dist[n] === Infinity) {
    console.log('-1');
    return;
  }

  const path = [];
  let cur = n;
  while (cur !== -1) {
    path.push(cur);
    cur = parent[cur];
  }
  path.reverse();
  console.log(path.join(' '));
}

solve();
