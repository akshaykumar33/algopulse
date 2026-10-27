var findKthLargest = function(nums, k) {
    class MinHeap {
        constructor() {
            this.heap = [];
        }
        size() {
            return this.heap.length;
        }
        push(val) {
            this.heap.push(val);
            this.up(this.heap.length - 1);
        }
        pop() {
            if (this.size() === 0) return null;
            const top = this.heap[0];
            const bottom = this.heap.pop();
            if (this.size() > 0) {
                this.heap[0] = bottom;
                this.down(0);
            }
            return top;
        }
        peek() {
            return this.heap[0];
        }
        up(i) {
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (this.heap[i] < this.heap[p]) {
                    [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
                    i = p;
                } else {
                    break;
                }
            }
        }
        down(i) {
            const len = this.heap.length;
            while ((i << 1) + 1 < len) {
                let left = (i << 1) + 1;
                let right = left + 1;
                let smallest = i;
                if (this.heap[left] < this.heap[smallest]) smallest = left;
                if (right < len && this.heap[right] < this.heap[smallest]) smallest = right;
                if (smallest !== i) {
                    [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
                    i = smallest;
                } else {
                    break;
                }
            }
        }
    }
    const h = new MinHeap();
    for (const x of nums) {
        h.push(x);
        if (h.size() > k) {
            h.pop();
        }
    }
    return h.peek();
};
var solve = typeof findKthLargest !== 'undefined' ? findKthLargest : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const nums = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i+1]);
        const result = solve(nums, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
