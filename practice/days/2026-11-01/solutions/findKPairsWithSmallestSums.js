var kSmallestPairs = function(nums1, nums2, k) {
  const res = [];
  if (!nums1 || !nums2 || nums1.length === 0 || nums2.length === 0 || k <= 0) return res;

  const heap = [];
  function push(item) {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (heap[i][0] < heap[p][0]) {
        const tmp = heap[i]; heap[i] = heap[p]; heap[p] = tmp;
        i = p;
      } else break;
    }
  }
  function pop() {
    if (heap.length === 0) return null;
    const top = heap[0];
    const bottom = heap.pop();
    if (heap.length > 0) {
      heap[0] = bottom;
      let i = 0;
      const len = heap.length;
      while (true) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        let smallest = i;
        if (left < len && heap[left][0] < heap[smallest][0]) smallest = left;
        if (right < len && heap[right][0] < heap[smallest][0]) smallest = right;
        if (smallest !== i) {
          const tmp = heap[i]; heap[i] = heap[smallest]; heap[smallest] = tmp;
          i = smallest;
        } else break;
      }
    }
    return top;
  }

  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    push([nums1[i] + nums2[0], i, 0]);
  }

  while (heap.length > 0 && res.length < k) {
    const item = pop();
    if (!item) break;
    const i = item[1];
    const j = item[2];
    res.push([nums1[i], nums2[j]]);
    if (j + 1 < nums2.length) {
      push([nums1[i] + nums2[j + 1], i, j + 1]);
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
      const lines = raw.split(/\r?\n/).filter(line => line.trim().length > 0);
      for (let i = 0; i + 2 < lines.length; i += 3) {
        try {
          const nums1 = JSON.parse(lines[i]);
          const nums2 = JSON.parse(lines[i+1]);
          const k = JSON.parse(lines[i+2]);
          const result = solve(nums1, nums2, k);
          console.log(JSON.stringify(result));
        } catch (e) {}
      }
    }
  } catch (err) {}
}

module.exports = solve;
