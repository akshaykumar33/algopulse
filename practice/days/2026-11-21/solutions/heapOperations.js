const fs = require('fs');
class FastMinHeap {
  constructor(cap = 1000000) {
    this.data = new Int32Array(cap);
    this.size = 0;
  }
  push(val) {
    let idx = this.size++;
    this.data[idx] = val;
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
    if (this.size === 0) return null;
    const top = this.data[0];
    const last = this.data[--this.size];
    if (this.size > 0) {
      this.data[0] = last;
      let idx = 0;
      while (true) {
        let best = idx;
        const l = (idx << 1) + 1;
        const r = (idx << 1) + 2;
        if (l < this.size && this.data[l] < this.data[best]) best = l;
        if (r < this.size && this.data[r] < this.data[best]) best = r;
        if (best === idx) break;
        const tmp = this.data[idx];
        this.data[idx] = this.data[best];
        this.data[best] = tmp;
        idx = best;
      }
    }
    return top;
  }
  peek() {
    return this.size > 0 ? this.data[0] : null;
  }
}
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const heap = new FastMinHeap(n * 2 + 10);
  const out = [];
  for (let i = 0; i < n; i++) {
    const op = input[ptr++];
    if (op === 'insert') {
      const x = parseInt(input[ptr++], 10);
      heap.push(x);
      out.push('insert ' + x);
    } else if (op === 'removeMin') {
      if (heap.size === 0) {
        heap.push(0);
        out.push('insert 0');
      }
      heap.pop();
      out.push('removeMin');
    } else if (op === 'getMin') {
      const x = parseInt(input[ptr++], 10);
      while (heap.size > 0 && heap.peek() < x) {
        heap.pop();
        out.push('removeMin');
      }
      if (heap.size === 0 || heap.peek() > x) {
        heap.push(x);
        out.push('insert ' + x);
      }
      out.push('getMin ' + x);
    }
  }
  console.log(out.length);
  console.log(out.join('\n'));
}
solve();