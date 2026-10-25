var find132pattern = function(nums) {
  let n = nums.length;
  if (n < 3) return false;
  let stk = [];
  let third = -Infinity;
  for (let i = n - 1; i >= 0; i--) {
    if (nums[i] < third) return true;
    while (stk.length > 0 && nums[i] > stk[stk.length - 1]) {
      third = stk.pop();
    }
    stk.push(nums[i]);
  }
  return false;
};

var solve = function(nums) {
  return find132pattern(nums);
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
