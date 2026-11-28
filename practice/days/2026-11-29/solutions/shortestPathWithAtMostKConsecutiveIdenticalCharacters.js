var shortestPath = function(n, edges, labels, k) {
  if (n === 1) return 0;
  const m = edges.length;
  const head = new Int32Array(n).fill(-1), nxt = new Int32Array(m), to = new Int32Array(m), wt = new Int32Array(m);
  for (let i = 0; i < m; i++) { const [u, v, w] = edges[i]; to[i] = v; wt[i] = w; nxt[i] = head[u]; head[u] = i; }
  const K = k + 1;
  const dist = new Float64Array(n * K).fill(Infinity);
  const hk = [], hv = [];
  const push = (d, s) => {
    let i = hk.length;
    hk.push(d); hv.push(s);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (hk[p] <= d) break;
      hk[i] = hk[p]; hv[i] = hv[p]; i = p;
    }
    hk[i] = d; hv[i] = s;
  };
  const pop = () => {
    const ld = hk.pop(), ls = hv.pop();
    const len = hk.length;
    if (!len) return;
    let i = 0;
    for (;;) {
      let b = 2 * i + 1;
      if (b >= len) break;
      if (b + 1 < len && hk[b + 1] < hk[b]) b++;
      if (hk[b] >= ld) break;
      hk[i] = hk[b]; hv[i] = hv[b]; i = b;
    }
    hk[i] = ld; hv[i] = ls;
  };
  dist[1] = 0;
  push(0, 1);
  while (hk.length) {
    const d = hk[0], s = hv[0];
    pop();
    if (d > dist[s]) continue;
    const u = (s / K) | 0, c = s - u * K;
    if (u === n - 1) return d;
    for (let e = head[u]; e !== -1; e = nxt[e]) {
      const v = to[e];
      const nc = labels.charCodeAt(v) === labels.charCodeAt(u) ? c + 1 : 1;
      if (nc > k) continue;
      const ns = v * K + nc, nd = d + wt[e];
      if (nd < dist[ns]) { dist[ns] = nd; push(nd, ns); }
    }
  }
  return -1;
};
var solve = shortestPath;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = shortestPath;
