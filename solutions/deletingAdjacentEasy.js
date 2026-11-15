const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

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
      const bot = this.data.pop();
      if (this.data.length > 0) {
        this.data[0] = bot;
        this.down(0);
      }
      return top;
    }
    up(i) {
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (this.data[i].val > this.data[p].val) {
          [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
          i = p;
        } else break;
      }
    }
    down(i) {
      const len = this.data.length;
      while ((i << 1) + 1 < len) {
        let left = (i << 1) + 1;
        let right = left + 1;
        let best = i;
        if (this.data[left].val > this.data[best].val) best = left;
        if (right < len && this.data[right].val > this.data[best].val) best = right;
        if (best !== i) {
          [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
          i = best;
        } else break;
      }
    }
  }

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));

    const heap = new MaxHeap();
    const plusSet = new Set();
    plusSet.add(0);

    for (let i = 1; i + 1 < n; i += 2) {
      heap.push({ val: a[i], idx: i });
      heap.push({ val: a[i + 1], idx: i + 1 });
      const top = heap.pop();
      plusSet.add(top.idx);
    }

    let total = 0;
    for (let i = 0; i < n; i++) {
      if (plusSet.has(i)) total += a[i];
      else total -= a[i];
    }

    out.push(total);
  }
  console.log(out.join('\n'));
}

solve();
