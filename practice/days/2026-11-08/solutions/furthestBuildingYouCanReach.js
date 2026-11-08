class LadderHeap {
  constructor() {
    this.h = [];
  }
  push(val) {
    this.h.push(val);
    let i = this.h.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (this.h[i] < this.h[p]) {
        let t = this.h[i];
        this.h[i] = this.h[p];
        this.h[p] = t;
        i = p;
      } else break;
    }
  }
  pop() {
    const top = this.h[0];
    const last = this.h.pop();
    if (this.h.length > 0) {
      this.h[0] = last;
      let i = 0;
      const n = this.h.length;
      while ((i << 1) + 1 < n) {
        let l = (i << 1) + 1, r = l + 1, b = i;
        if (this.h[l] < this.h[b]) b = l;
        if (r < n && this.h[r] < this.h[b]) b = r;
        if (b !== i) {
          let t = this.h[i];
          this.h[i] = this.h[b];
          this.h[b] = t;
          i = b;
        } else break;
      }
    }
    return top;
  }
  size() {
    return this.h.length;
  }
}

var furthestBuilding = function(heights, bricks, ladders) {
  const heap = new LadderHeap();
  const n = heights.length;
  for (let i = 0; i < n - 1; i++) {
    const diff = heights[i + 1] - heights[i];
    if (diff > 0) {
      heap.push(diff);
      if (heap.size() > ladders) {
        bricks -= heap.pop();
        if (bricks < 0) return i;
      }
    }
  }
  return n - 1;
};

var solve = furthestBuilding;
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
