class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(val) {
    this.heap.push(val);
    this.up(this.heap.length - 1);
  }
  pop() {
    if (this.heap.length === 0) return null;
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this.down(0);
    }
    return top;
  }
  size() {
    return this.heap.length;
  }
  up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[i][0] < this.heap[p][0]) {
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
      let small = left;
      if (right < len && this.heap[right][0] < this.heap[left][0]) {
        small = right;
      }
      if (this.heap[small][0] < this.heap[i][0]) {
        [this.heap[small], this.heap[i]] = [this.heap[i], this.heap[small]];
        i = small;
      } else {
        break;
      }
    }
  }
}

var kSmallestPairs = function(nums1, nums2, k) {
  const res = [];
  if (!nums1.length || !nums2.length || k <= 0) return res;
  const pq = new MinHeap();
  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    pq.push([nums1[i] + nums2[0], i, 0]);
  }
  while (pq.size() > 0 && res.length < k) {
    const [sum, i, j] = pq.pop();
    res.push([nums1[i], nums2[j]]);
    if (j + 1 < nums2.length) {
      pq.push([nums1[i] + nums2[j + 1], i, j + 1]);
    }
  }
  return res;
};

var solve = kSmallestPairs;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const nums1 = JSON.parse(lines[i]);
        const nums2 = JSON.parse(lines[i+1]);
        const k = JSON.parse(lines[i+2]);
        i += 2;
        const result = solve(nums1, nums2, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
