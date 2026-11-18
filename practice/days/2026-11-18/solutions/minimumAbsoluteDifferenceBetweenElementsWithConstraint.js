var minAbsoluteDifference = function(nums, x) {
  const n = nums.length;
  const sortedVals = Array.from(new Set(nums)).sort((a, b) => a - b);
  const m = sortedVals.length;

  function getIdx(v) {
    let l = 0;
    let r = m - 1;
    while (l <= r) {
      const mid = (l + r) >> 1;
      if (sortedVals[mid] === v) return mid;
      if (sortedVals[mid] < v) l = mid + 1;
      else r = mid - 1;
    }
    return l;
  }

  const tree = new Int32Array(4 * m);

  function update(node, l, r, idx) {
    tree[node]++;
    if (l === r) return;
    const mid = (l + r) >> 1;
    if (idx <= mid) update(node << 1, l, mid, idx);
    else update((node << 1) | 1, mid + 1, r, idx);
  }

  function findPrev(node, l, r, ql, qr) {
    if (tree[node] === 0 || l > qr || r < ql) return -1;
    if (l === r) return l;
    const mid = (l + r) >> 1;
    const rightRes = findPrev((node << 1) | 1, mid + 1, r, ql, qr);
    if (rightRes !== -1) return rightRes;
    return findPrev(node << 1, l, mid, ql, qr);
  }

  function findNext(node, l, r, ql, qr) {
    if (tree[node] === 0 || l > qr || r < ql) return -1;
    if (l === r) return l;
    const mid = (l + r) >> 1;
    const leftRes = findNext(node << 1, l, mid, ql, qr);
    if (leftRes !== -1) return leftRes;
    return findNext((node << 1) | 1, mid + 1, r, ql, qr);
  }

  let minDiff = Infinity;
  for (let i = x; i < n; i++) {
    const addVal = nums[i - x];
    const addIdx = getIdx(addVal);
    update(1, 0, m - 1, addIdx);

    const curVal = nums[i];
    const curIdx = getIdx(curVal);

    const prevIdx = findPrev(1, 0, m - 1, 0, curIdx);
    if (prevIdx !== -1) {
      const d = curVal - sortedVals[prevIdx];
      if (d < minDiff) minDiff = d;
    }

    const nextIdx = findNext(1, 0, m - 1, curIdx, m - 1);
    if (nextIdx !== -1) {
      const d = sortedVals[nextIdx] - curVal;
      if (d < minDiff) minDiff = d;
    }
  }

  return minDiff;
};

var solve = minAbsoluteDifference;

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

module.exports = minAbsoluteDifference;
