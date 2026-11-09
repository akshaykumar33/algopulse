class MaxHeap {
  constructor() {
    this.data = [];
  }
  push(val) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[i][1] > this.data[p][1]) {
        const tmp = this.data[i];
        this.data[i] = this.data[p];
        this.data[p] = tmp;
        i = p;
      } else break;
    }
  }
  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      let i = 0;
      const len = this.data.length;
      while ((i << 1) + 1 < len) {
        let left = (i << 1) + 1;
        let right = left + 1;
        let best = i;
        if (this.data[left][1] > this.data[best][1]) best = left;
        if (right < len && this.data[right][1] > this.data[best][1]) best = right;
        if (best !== i) {
          const tmp = this.data[i];
          this.data[i] = this.data[best];
          this.data[best] = tmp;
          i = best;
        } else break;
      }
    }
    return top;
  }
  isEmpty() {
    return this.data.length === 0;
  }
}

var maxProbability = function(n, edges, succProb, start_node, end_node) {
  const head = new Int32Array(n).fill(-1);
  const m = edges.length;
  const to = new Int32Array(2 * m);
  const nxt = new Int32Array(2 * m);
  const weight = new Float64Array(2 * m);
  let edgeCnt = 0;

  function addEdge(u, v, w) {
    to[edgeCnt] = v;
    weight[edgeCnt] = w;
    nxt[edgeCnt] = head[u];
    head[u] = edgeCnt++;
  }

  for (let i = 0; i < m; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    const p = succProb[i];
    addEdge(u, v, p);
    addEdge(v, u, p);
  }

  const prob = new Float64Array(n);
  prob[start_node] = 1.0;

  const pq = new MaxHeap();
  pq.push([start_node, 1.0]);

  while (!pq.isEmpty()) {
    const cur = pq.pop();
    const u = cur[0];
    const p = cur[1];
    if (u === end_node) return p;
    if (p < prob[u]) continue;

    for (let e = head[u]; e !== -1; e = nxt[e]) {
      const v = to[e];
      const np = p * weight[e];
      if (np > prob[v]) {
        prob[v] = np;
        pq.push([v, np]);
      }
    }
  }

  return prob[end_node];
};

var solve = maxProbability;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = solve;
