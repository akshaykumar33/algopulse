var singleNonDuplicate = function(nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (mid % 2 === 1) {
            mid--;
        }
        if (nums[mid] === nums[mid + 1]) {
            left = mid + 2;
        } else {
            right = mid;
        }
    }
    return nums[left];
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && singleNonDuplicate.length > 1 ? singleNonDuplicate(...parsed) : singleNonDuplicate(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(singleNonDuplicate(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = singleNonDuplicate;
