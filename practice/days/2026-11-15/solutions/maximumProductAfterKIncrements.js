var maximumProduct = function(nums, k) {
  class MinHeap {
    constructor() {
      this.data = [];
    }
    push(val) {
      this.data.push(val);
      this.up(this.data.length - 1);
    }
    pop() {
      if (this.data.length === 0) return 0;
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
        if (this.data[i] < this.data[p]) {
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
        if (this.data[left] < this.data[best]) best = left;
        if (right < len && this.data[right] < this.data[best]) best = right;
        if (best !== i) {
          [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
          i = best;
        } else break;
      }
    }
  }

  const heap = new MinHeap();
  for (let i = 0; i < nums.length; i++) heap.push(nums[i]);

  for (let i = 0; i < k; i++) {
    const min = heap.pop();
    heap.push(min + 1);
  }

  const MOD = 1000000007n;
  let prod = 1n;
  for (let i = 0; i < heap.data.length; i++) {
    prod = (prod * BigInt(heap.data[i])) % MOD;
  }

  return Number(prod);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(maximumProduct(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = maximumProduct;
