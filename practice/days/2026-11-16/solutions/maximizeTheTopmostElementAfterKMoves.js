var maximumTop = function(nums, k) {
  const n = nums.length;
  if (n === 1) {
    return k % 2 === 1 ? -1 : nums[0];
  }
  if (k === 0) return nums[0];
  if (k === 1) return nums[1];

  let maxVal = -1;
  const limit = Math.min(n, k - 1);
  for (let i = 0; i < limit; i++) {
    if (nums[i] > maxVal) maxVal = nums[i];
  }
  if (k < n && nums[k] > maxVal) {
    maxVal = nums[k];
  }
  return maxVal;
};

var solve = maximumTop;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(...parsed)));
    }
  } catch (e) {}
}
