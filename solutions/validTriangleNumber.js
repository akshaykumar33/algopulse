var solve = function(nums) {
    nums.sort((a, b) => a - b);
    let n = nums.length;
    let ans = 0;
    for (let i = n - 1; i >= 2; i--) {
        let l = 0, r = i - 1;
        while (l < r) {
            if (nums[l] + nums[r] > nums[i]) {
                ans += (r - l);
                r--;
            } else {
                l++;
            }
        }
    }
    return ans;
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
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
