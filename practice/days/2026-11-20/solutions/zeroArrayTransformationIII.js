class CustomMaxHeap {
  constructor() {
    this.h = [];
  }
  push(v) {
    this.h.push(v);
    let i = this.h.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (this.h[p] < this.h[i]) {
        let t = this.h[p];
        this.h[p] = this.h[i];
        this.h[i] = t;
        i = p;
      } else break;
    }
  }
  pop() {
    if (!this.h.length) return null;
    let top = this.h[0];
    let end = this.h.pop();
    if (this.h.length) {
      this.h[0] = end;
      let i = 0, n = this.h.length;
      while ((i << 1) + 1 < n) {
        let l = (i << 1) + 1, r = l + 1, best = l;
        if (r < n && this.h[r] > this.h[l]) best = r;
        if (this.h[best] > this.h[i]) {
          let t = this.h[best];
          this.h[best] = this.h[i];
          this.h[i] = t;
          i = best;
        } else break;
      }
    }
    return top;
  }
  peek() {
    return this.h[0] ?? null;
  }
  size() {
    return this.h.length;
  }
}

var maxRemoval = function(nums, queries) {
  queries.sort((a, b) => a[0] - b[0]);
  const n = nums.length;
  const heap = new CustomMaxHeap();
  const diff = new Int32Array(n + 2);
  let curDec = 0;
  let qIdx = 0;
  let usedCount = 0;

  for (let i = 0; i < n; i++) {
    curDec += diff[i];
    while (qIdx < queries.length && queries[qIdx][0] === i) {
      heap.push(queries[qIdx][1]);
      qIdx++;
    }

    while (curDec < nums[i]) {
      if (heap.size() === 0 || heap.peek() < i) return -1;
      const r = heap.pop();
      curDec++;
      diff[r + 1]--;
      usedCount++;
    }
  }

  return queries.length - usedCount;
};

var solve = maxRemoval;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = maxRemoval;
