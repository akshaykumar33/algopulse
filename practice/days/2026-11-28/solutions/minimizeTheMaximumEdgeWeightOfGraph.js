var minMaxWeight = function(n, edges, threshold) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b, w] of edges) adj[b].push([a, w]);
  const dist = new Array(n).fill(Infinity);
  dist[0] = 0;
  const heap = [[0, 0]];
  const push = (x) => {
    heap.push(x);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = () => {
    const top = heap[0], last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      while (true) {
        let l = 2 * i + 1, r = l + 1, b = i;
        if (l < heap.length && heap[l][0] < heap[b][0]) b = l;
        if (r < heap.length && heap[r][0] < heap[b][0]) b = r;
        if (b === i) break;
        [heap[b], heap[i]] = [heap[i], heap[b]];
        i = b;
      }
    }
    return top;
  };
  while (heap.length) {
    const [d, u] = pop();
    if (d > dist[u]) continue;
    for (const [v, w] of adj[u]) {
      const nd = Math.max(d, w);
      if (nd < dist[v]) { dist[v] = nd; push([nd, v]); }
    }
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (dist[i] === Infinity) return -1;
    if (dist[i] > ans) ans = dist[i];
  }
  return ans;
};
var solve = minMaxWeight;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = minMaxWeight;
