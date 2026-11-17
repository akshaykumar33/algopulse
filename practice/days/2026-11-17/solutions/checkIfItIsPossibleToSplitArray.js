var canSplitArray = function(nums, m) {
  if (nums.length <= 2) return true;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] + nums[i + 1] >= m) {
      return true;
    }
  }
  return false;
};

var solve = canSplitArray;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
