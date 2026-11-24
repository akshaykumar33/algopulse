const fs = require('fs');

class MinHeap {
  constructor() {
    this.h = [];
  }
  push(val) {
    this.h.push(val);
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[p][0] <= this.h[i][0]) break;
      const t = this.h[p];
      this.h[p] = this.h[i];
      this.h[i] = t;
      i = p;
    }
  }
  pop() {
    if (this.h.length === 0) return null;
    const res = this.h[0];
    const top = this.h.pop();
    if (this.h.length > 0) {
      this.h[0] = top;
      let i = 0;
      const len = this.h.length;
      while (true) {
        const l = (i << 1) + 1;
        const r = l + 1;
        let min = i;
        if (l < len && this.h[l][0] < this.h[min][0]) min = l;
        if (r < len && this.h[r][0] < this.h[min][0]) min = r;
        if (min === i) break;
        const t = this.h[i];
        this.h[i] = this.h[min];
        this.h[min] = t;
        i = min;
      }
    }
    return res;
  }
  get size() {
    return this.h.length;
  }
}

function dijkstra(n, adj, src) {
  const dist = new Float64Array(n + 1).fill(Infinity);
  dist[src] = 0;
  const pq = new MinHeap();
  pq.push([0, src]);
  while (pq.size > 0) {
    const [d, u] = pq.pop();
    if (d > dist[u]) continue;
    const neighbors = adj[u];
    if (!neighbors) continue;
    for (let i = 0; i < neighbors.length; i += 2) {
      const v = neighbors[i];
      const w = neighbors[i + 1];
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
      }
    }
  }
  return dist;
}

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const T = nextInt();
  if (T === null) return;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const m = nextInt();
    const s = nextInt();
    const t = nextInt();
    const v = nextInt();
    const adj = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < m; i++) {
      const u = nextInt();
      const wNode = nextInt();
      const c = nextInt();
      adj[u].push(wNode, c);
      adj[wNode].push(u, c);
    }
    const ds = dijkstra(n, adj, s);
    const dt = dijkstra(n, adj, t);
    const dv = dijkstra(n, adj, v);
    let ans = Infinity;
    for (let x = 1; x <= n; x++) {
      const total = ds[x] + dt[x] + dv[x];
      if (total < ans) ans = total;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
