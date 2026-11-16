var countFairPairs = function(nums, lower, upper) {
  nums.sort((a, b) => a - b);
  const n = nums.length;

  function countLessEqual(val) {
    let count = 0;
    let l = 0;
    let r = n - 1;
    while (l < r) {
      if (nums[l] + nums[r] <= val) {
        count += r - l;
        l++;
      } else {
        r--;
      }
    }
    return count;
  }

  return countLessEqual(upper) - countLessEqual(lower - 1);
};

var solve = countFairPairs;

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
