class FastMaxHeap {
  constructor(arr) {
    this.h = arr ? arr.slice() : [];
    for (let i = (this.h.length >> 1) - 1; i >= 0; i--) this._down(i);
  }
  push(val) {
    this.h.push(val);
    this._up(this.h.length - 1);
  }
  pop() {
    const top = this.h[0];
    const bottom = this.h.pop();
    if (this.h.length > 0) {
      this.h[0] = bottom;
      this._down(0);
    }
    return top;
  }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[i] > this.h[p]) {
        const tmp = this.h[i];
        this.h[i] = this.h[p];
        this.h[p] = tmp;
        i = p;
      } else break;
    }
  }
  _down(i) {
    const len = this.h.length;
    while ((i << 1) + 1 < len) {
      let l = (i << 1) + 1;
      let r = l + 1;
      let best = i;
      if (this.h[l] > this.h[best]) best = l;
      if (r < len && this.h[r] > this.h[best]) best = r;
      if (best !== i) {
        const tmp = this.h[i];
        this.h[i] = this.h[best];
        this.h[best] = tmp;
        i = best;
      } else break;
    }
  }
}

var halveArray = function(nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) sum += nums[i];
  const heap = new FastMaxHeap(nums);
  const target = sum / 2;
  let reduced = 0;
  let ans = 0;
  while (reduced < target - 1e-7) {
    const top = heap.pop();
    const half = top / 2;
    reduced += half;
    ans++;
    heap.push(half);
  }
  return ans;
};

var solve = halveArray;

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
