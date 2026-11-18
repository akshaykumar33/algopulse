class CustomMinHeap {
  constructor() {
    this.h = [];
  }
  push(val) {
    this.h.push(val);
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[i] < this.h[p]) {
        const tmp = this.h[i];
        this.h[i] = this.h[p];
        this.h[p] = tmp;
        i = p;
      } else break;
    }
  }
  pop() {
    if (this.h.length === 0) return null;
    const top = this.h[0];
    const last = this.h.pop();
    if (this.h.length > 0) {
      this.h[0] = last;
      let i = 0;
      const len = this.h.length;
      while ((i << 1) + 1 < len) {
        let left = (i << 1) + 1;
        let right = left + 1;
        let best = i;
        if (this.h[left] < this.h[best]) best = left;
        if (right < len && this.h[right] < this.h[best]) best = right;
        if (best !== i) {
          const tmp = this.h[i];
          this.h[i] = this.h[best];
          this.h[best] = tmp;
          i = best;
        } else break;
      }
    }
    return top;
  }
  peek() {
    return this.h.length > 0 ? this.h[0] : null;
  }
  size() {
    return this.h.length;
  }
}

var minOperations = function(nums, k) {
  const kBig = BigInt(k);
  const heap = new CustomMinHeap();
  for (let i = 0; i < nums.length; i++) {
    heap.push(BigInt(nums[i]));
  }
  let ops = 0;
  while (heap.size() >= 2 && heap.peek() < kBig) {
    const x = heap.pop();
    const y = heap.pop();
    heap.push(2n * x + y);
    ops++;
  }
  return ops;
};

var solve = minOperations;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = minOperations;
