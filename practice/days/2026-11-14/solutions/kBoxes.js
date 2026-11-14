const fs = require('fs');

class MinHeap {
  constructor(capacity) {
    this.data = new Float64Array(capacity + 1);
    this.size = 0;
  }
  push(val) {
    let idx = ++this.size;
    while (idx > 1) {
      let parent = idx >> 1;
      if (this.data[parent] <= val) break;
      this.data[idx] = this.data[parent];
      idx = parent;
    }
    this.data[idx] = val;
  }
  pop() {
    let top = this.data[1];
    let last = this.data[this.size--];
    let idx = 1;
    while ((idx << 1) <= this.size) {
      let child = idx << 1;
      if (child < this.size && this.data[child + 1] < this.data[child]) {
        child++;
      }
      if (last <= this.data[child]) break;
      this.data[idx] = this.data[child];
      idx = child;
    }
    this.data[idx] = last;
    return top;
  }
  top() {
    return this.data[1];
  }
}

function solve() {
  const input = fs.readFileSync(0, 'utf8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    const a = new Int32Array(n);
    const b = new Float64Array(n);
    const idx = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
      idx[i] = i;
    }
    for (let i = 0; i < n; i++) {
      b[i] = nextInt();
    }
    idx.sort((i, j) => a[i] - a[j]);
    const ans = new Float64Array(n);
    const heap = new MinHeap(k + 2);
    let sum = 0;
    for (let step = 0; step < n; step++) {
      const i = idx[step];
      ans[i] = sum;
      const coin = b[i];
      if (k > 0) {
        if (heap.size < k) {
          heap.push(coin);
          sum += coin;
        } else if (coin > heap.top()) {
          sum += coin - heap.pop();
          heap.push(coin);
        }
      }
    }
    out.push(ans.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
