const fs = require('fs');

class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(val) {
    this.heap.push(val);
    this._up(this.heap.length - 1);
  }
  pop() {
    if (this.heap.length === 0) return null;
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this._down(0);
    }
    return top;
  }
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }
  size() {
    return this.heap.length;
  }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[i] < this.heap[p]) {
        const tmp = this.heap[i];
        this.heap[i] = this.heap[p];
        this.heap[p] = tmp;
        i = p;
      } else {
        break;
      }
    }
  }
  _down(i) {
    const len = this.heap.length;
    while ((i << 1) + 1 < len) {
      let left = (i << 1) + 1;
      let right = left + 1;
      let best = left;
      if (right < len && this.heap[right] < this.heap[left]) {
        best = right;
      }
      if (this.heap[best] < this.heap[i]) {
        const tmp = this.heap[i];
        this.heap[i] = this.heap[best];
        this.heap[best] = tmp;
        i = best;
      } else {
        break;
      }
    }
  }
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const k = parseInt(input[idx++], 10);
    const n = parseInt(input[idx++], 10);
    const res = [];
    const heap = new MinHeap();

    for (let i = 0; i < n; i++) {
      const x = parseInt(input[idx++], 10);
      if (heap.size() < k) {
        heap.push(x);
        if (heap.size() === k) {
          res.push(heap.peek());
        } else {
          res.push(-1);
        }
      } else {
        if (x > heap.peek()) {
          heap.pop();
          heap.push(x);
        }
        res.push(heap.peek());
      }
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
