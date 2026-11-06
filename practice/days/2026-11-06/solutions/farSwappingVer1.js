const fs = require('fs');

class MinHeap {
  constructor() {
    this.data = [];
  }
  push(val) {
    this.data.push(val);
    let idx = this.data.length - 1;
    while (idx > 0) {
      const p = (idx - 1) >> 1;
      if (this.data[p] <= this.data[idx]) break;
      const tmp = this.data[p];
      this.data[p] = this.data[idx];
      this.data[idx] = tmp;
      idx = p;
    }
  }
  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const bottom = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = bottom;
      let idx = 0;
      const len = this.data.length;
      while (true) {
        let left = (idx << 1) + 1;
        let right = left + 1;
        let smallest = idx;
        if (left < len && this.data[left] < this.data[smallest]) smallest = left;
        if (right < len && this.data[right] < this.data[smallest]) smallest = right;
        if (smallest === idx) break;
        const tmp = this.data[idx];
        this.data[idx] = this.data[smallest];
        this.data[smallest] = tmp;
        idx = smallest;
      }
    }
    return top;
  }
  size() {
    return this.data.length;
  }
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const pos = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
      const val = Number(input[ptr++]);
      pos[val] = i;
    }

    const adj = Array.from({ length: n + 1 }, () => []);
    const inDegree = new Int32Array(n + 1);

    for (let x = 1; x < n; x++) {
      if (pos[x] < pos[x + 1]) {
        adj[x].push(x + 1);
        inDegree[x + 1]++;
      } else {
        adj[x + 1].push(x);
        inDegree[x]++;
      }
    }

    const heap = new MinHeap();
    for (let x = 1; x <= n; x++) {
      if (inDegree[x] === 0) {
        heap.push(x);
      }
    }

    const res = [];
    while (heap.size() > 0) {
      const u = heap.pop();
      res.push(u);
      const neighbors = adj[u];
      for (let i = 0; i < neighbors.length; i++) {
        const v = neighbors[i];
        inDegree[v]--;
        if (inDegree[v] === 0) {
          heap.push(v);
        }
      }
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

