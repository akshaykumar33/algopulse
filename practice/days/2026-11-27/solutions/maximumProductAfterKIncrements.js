var maximumProduct = function(nums, k) {
  const MOD = 1000000007;
  class MinHeap {
    constructor() { this.d = []; }
    push(v) {
      this.d.push(v);
      let i = this.d.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (this.d[i] < this.d[p]) {
          const t = this.d[i]; this.d[i] = this.d[p]; this.d[p] = t;
          i = p;
        } else break;
      }
    }
    pop() {
      const top = this.d[0];
      const bot = this.d.pop();
      if (this.d.length > 0) {
        this.d[0] = bot;
        let i = 0;
        while (true) {
          let b = i;
          const l = 2 * i + 1, r = 2 * i + 2;
          if (l < this.d.length && this.d[l] < this.d[b]) b = l;
          if (r < this.d.length && this.d[r] < this.d[b]) b = r;
          if (b !== i) {
            const t = this.d[i]; this.d[i] = this.d[b]; this.d[b] = t;
            i = b;
          } else break;
        }
      }
      return top;
    }
  }
  const heap = new MinHeap();
  for (const x of nums) heap.push(x);
  while (k-- > 0) {
    const v = heap.pop();
    heap.push(v + 1);
  }
  let ans = 1;
  for (const x of heap.d) {
    ans = Number((BigInt(ans) * BigInt(x)) % BigInt(MOD));
  }
  return ans;
};
var solve = maximumProduct;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = maximumProduct;
