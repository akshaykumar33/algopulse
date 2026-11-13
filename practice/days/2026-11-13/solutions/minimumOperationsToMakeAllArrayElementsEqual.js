function bisectLeft(arr, target) {
  let low = 0;
  let high = arr.length;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (arr[mid] < target) low = mid + 1;
    else high = mid;
  }
  return low;
}

var minOperations = function(nums, queries) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const pref = new Float64Array(n + 1);
  for (let i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + nums[i];
  }
  const m = queries.length;
  const ans = new Array(m);
  for (let i = 0; i < m; i++) {
    const q = queries[i];
    const idx = bisectLeft(nums, q);
    const leftCost = idx * q - pref[idx];
    const rightCost = (pref[n] - pref[idx]) - (n - idx) * q;
    ans[i] = leftCost + rightCost;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    if (lines.length === 1) {
      const parsed = JSON.parse(lines[0]);
      console.log(JSON.stringify(minOperations(...parsed)));
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const nums = JSON.parse(lines[i]);
        const queries = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(minOperations(nums, queries)));
      }
    }
  }
}

module.exports = minOperations;
