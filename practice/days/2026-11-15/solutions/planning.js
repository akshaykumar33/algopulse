const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);
  const c = [];
  for (let i = 0; i < n; i++) c.push(parseInt(input[ptr++], 10));

  class MaxHeap {
    constructor() {
      this.data = [];
    }
    push(item) {
      this.data.push(item);
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
        if (this.data[i].cost > this.data[p].cost) {
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
        if (this.data[left].cost > this.data[best].cost) best = left;
        if (right < len && this.data[right].cost > this.data[best].cost) best = right;
        if (best !== i) {
          [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
          i = best;
        } else break;
      }
    }
  }

  const heap = new MaxHeap();
  let inPtr = 0;
  const ansTime = new Int32Array(n + 1);
  let totalCost = 0n;

  for (let t = k + 1; t <= k + n; t++) {
    while (inPtr < n && inPtr + 1 <= t) {
      heap.push({ id: inPtr + 1, cost: c[inPtr] });
      inPtr++;
    }
    const best = heap.pop();
    ansTime[best.id] = t;
    totalCost += BigInt(best.cost) * BigInt(t - best.id);
  }

  const out = [totalCost.toString()];
  const res = [];
  for (let i = 1; i <= n; i++) res.push(ansTime[i]);
  out.push(res.join(' '));
  console.log(out.join('\n'));
}

solve();
