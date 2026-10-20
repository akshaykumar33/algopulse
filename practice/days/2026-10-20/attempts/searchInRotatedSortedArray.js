var search = function(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        let m = (l + r) >> 1;
        if (nums[m] === target) return m;
        if (nums[l] <= nums[m]) {
            if (nums[l] <= target && target < nums[m]) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        } else {
            if (nums[m] < target && target <= nums[r]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
    }
    return -1;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        if (i + 1 < lines.length) {
          const nums = JSON.parse(lines[i]);
          const target = JSON.parse(lines[i+1]);
          const result = search(nums, target);
          console.log(JSON.stringify(result));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = search;
