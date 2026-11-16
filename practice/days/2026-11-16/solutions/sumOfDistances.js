var distance = function(nums) {
  const n = nums.length;
  const arr = new Array(n).fill(0);
  const map = new Map();
  for (let i = 0; i < n; i++) {
    const v = nums[i];
    if (!map.has(v)) map.set(v, []);
    map.get(v).push(i);
  }

  for (const indices of map.values()) {
    const m = indices.length;
    if (m <= 1) continue;
    let totalSum = 0;
    for (let i = 0; i < m; i++) totalSum += indices[i];
    let leftSum = 0;
    for (let i = 0; i < m; i++) {
      const idx = indices[i];
      const rightSum = totalSum - leftSum - idx;
      const leftCount = i;
      const rightCount = m - 1 - i;
      arr[idx] = (leftCount * idx - leftSum) + (rightSum - rightCount * idx);
      leftSum += idx;
    }
  }
  return arr;
};

var solve = distance;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      const res = Array.isArray(parsed) && Array.isArray(parsed[0]) ? solve(...parsed) : solve(parsed);
      console.log(JSON.stringify(res));
    }
  } catch (e) {}
}
