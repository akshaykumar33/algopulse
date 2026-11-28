var findMaxSum = function(nums1, nums2, k) {
  const n = nums1.length;
  const idx = Array.from({ length: n }, (_, i) => i).sort((a, b) => nums1[a] - nums1[b]);
  const ans = new Array(n).fill(0);
  const heap = [];
  let sum = 0;
  const push = (v) => {
    heap.push(v);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p] <= heap[i]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = () => {
    const top = heap[0], last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      while (true) {
        let l = 2 * i + 1, r = l + 1, b = i;
        if (l < heap.length && heap[l] < heap[b]) b = l;
        if (r < heap.length && heap[r] < heap[b]) b = r;
        if (b === i) break;
        [heap[b], heap[i]] = [heap[i], heap[b]];
        i = b;
      }
    }
    return top;
  };
  let i = 0;
  while (i < n) {
    let j = i;
    while (j < n && nums1[idx[j]] === nums1[idx[i]]) { ans[idx[j]] = sum; j++; }
    for (let t = i; t < j; t++) {
      push(nums2[idx[t]]);
      sum += nums2[idx[t]];
      if (heap.length > k) sum -= pop();
    }
    i = j;
  }
  return ans;
};
var solve = findMaxSum;
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
module.exports = findMaxSum;
