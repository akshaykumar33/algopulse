var rotateFunction = function(nums) {
    let n = nums.length;
    let sum = 0;
    let f = 0;
    for (let i = 0; i < n; i++) {
        sum += nums[i];
        f += i * nums[i];
    }
    let ans = f;
    for (let i = 1; i < n; i++) {
        f = f + sum - n * nums[n - i];
        if (f > ans) {
            ans = f;
        }
    }
    return ans;
};
var solve = typeof rotateFunction !== 'undefined' ? rotateFunction : null;

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
