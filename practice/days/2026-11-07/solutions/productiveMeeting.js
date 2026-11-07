const fs = require('fs');

class MaxHeap {
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
  size() {
    return this.data.length;
  }
  up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[i].val > this.data[p].val) {
        const tmp = this.data[i];
        this.data[i] = this.data[p];
        this.data[p] = tmp;
        i = p;
      } else break;
    }
  }
  down(i) {
    const len = this.data.length;
    while ((i << 1) + 1 < len) {
      let best = (i << 1) + 1;
      const right = best + 1;
      if (right < len && this.data[right].val > this.data[best].val) {
        best = right;
      }
      if (this.data[best].val > this.data[i].val) {
        const tmp = this.data[i];
        this.data[i] = this.data[best];
        this.data[best] = tmp;
        i = best;
      } else break;
    }
  }
}

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const heap = new MaxHeap();
    for (let i = 1; i <= n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      if (v > 0) heap.push({ val: v, idx: i });
    }

    const talks = [];
    while (heap.size() >= 2) {
      const a = heap.pop();
      const b = heap.pop();
      talks.push(a.idx + ' ' + b.idx);
      a.val--;
      b.val--;
      if (a.val > 0) heap.push(a);
      if (b.val > 0) heap.push(b);
    }

    out.push(talks.length);
    for (let i = 0; i < talks.length; i++) {
      out.push(talks[i]);
    }
  }

  console.log(out.join('\n'));
}

solve();
