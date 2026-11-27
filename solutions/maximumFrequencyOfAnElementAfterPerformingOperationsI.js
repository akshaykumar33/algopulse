var maxFrequency = function(nums, k, numOperations) {
  nums.sort((a, b) => a - b);
  const countMap = new Map();
  for (const x of nums) countMap.set(x, (countMap.get(x) || 0) + 1);
  const candidates = new Set(nums);
  for (const x of nums) {
    candidates.add(x - k);
    candidates.add(x + k);
  }
  function countRange(l, r) {
    let low = 0, high = nums.length - 1, leftIdx = nums.length;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (nums[mid] >= l) { leftIdx = mid; high = mid - 1; }
      else low = mid + 1;
    }
    low = 0; high = nums.length - 1; let rightIdx = -1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (nums[mid] <= r) { rightIdx = mid; low = mid + 1; }
      else high = mid - 1;
    }
    return leftIdx <= rightIdx ? rightIdx - leftIdx + 1 : 0;
  }
  let ans = 0;
  for (const target of candidates) {
    const totalInRange = countRange(target - k, target + k);
    const exact = countMap.get(target) || 0;
    const canChange = totalInRange - exact;
    const cur = exact + Math.min(numOperations, canChange);
    if (cur > ans) ans = cur;
  }
  return ans;
};
var solve = maxFrequency;
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
module.exports = maxFrequency;
