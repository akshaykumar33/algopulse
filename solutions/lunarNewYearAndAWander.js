const fs = require('fs');

class MinHeap {
  constructor() {
    this.data = [];
  }
  push(val) {
    this.data.push(val);
    this.up(this.data.length - 1);
  }
  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const bottom = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = bottom;
      this.down(0);
    }
    return top;
  }
  up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[i] < this.data[p]) {
        const tmp = this.data[i];
        this.data[i] = this.data[p];
        this.data[p] = tmp;
        i = p;
      } else {
        break;
      }
    }
  }
  down(i) {
    const len = this.data.length;
    while (true) {
      let best = i;
      const l = (i << 1) + 1;
      const r = l + 1;
      if (l < len && this.data[l] < this.data[best]) best = l;
      if (r < len && this.data[r] < this.data[best]) best = r;
      if (best !== i) {
        const tmp = this.data[i];
        this.data[i] = this.data[best];
        this.data[best] = tmp;
        i = best;
      } else {
        break;
      }
    }
  }
  size() {
    return this.data.length;
  }
}

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
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

  const n = readInt();
  if (n === null) return;
  const m = readInt();

  const head = new Int32Array(n + 1).fill(-1);
  const to = new Int32Array(2 * m);
  const next = new Int32Array(2 * m);
  let edgeCount = 0;

  function addEdge(u, v) {
    to[edgeCount] = v;
    next[edgeCount] = head[u];
    head[u] = edgeCount++;
  }

  for (let i = 0; i < m; i++) {
    const u = readInt();
    const v = readInt();
    addEdge(u, v);
    addEdge(v, u);
  }

  const visited = new Uint8Array(n + 1);
  const heap = new MinHeap();
  const ans = [];

  heap.push(1);
  visited[1] = 1;

  while (heap.size() > 0) {
    const u = heap.pop();
    ans.push(u);

    let e = head[u];
    while (e !== -1) {
      const v = to[e];
      if (!visited[v]) {
        visited[v] = 1;
        heap.push(v);
      }
      e = next[e];
    }
  }

  console.log(ans.join(' '));
}

solve();
