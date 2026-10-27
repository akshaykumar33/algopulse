var longestSubarray = function(nums) {
    let maxVal = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > maxVal) {
            maxVal = nums[i];
        }
    }
    let ans = 0;
    let cur = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === maxVal) {
            cur++;
            if (cur > ans) ans = cur;
        } else {
            cur = 0;
        }
    }
    return ans;
};

var solve = typeof longestSubarray !== 'undefined' ? longestSubarray : null;

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
