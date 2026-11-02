var threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a - b);
    let n = nums.length;
    let ans = nums[0] + nums[1] + nums[2];
    for (let i = 0; i < n - 2; i++) {
        let l = i + 1, r = n - 1;
        while (l < r) {
            let sum = nums[i] + nums[l] + nums[r];
            if (Math.abs(sum - target) < Math.abs(ans - target)) {
                ans = sum;
            }
            if (sum === target) {
                return target;
            } else if (sum < target) {
                l++;
            } else {
                r--;
            }
        }
    }
    return ans;
};
var solve = typeof threeSumClosest !== 'undefined' ? threeSumClosest : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const nums = JSON.parse(lines[i]);
        const target = JSON.parse(lines[i + 1]);
        const result = solve(nums, target);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
