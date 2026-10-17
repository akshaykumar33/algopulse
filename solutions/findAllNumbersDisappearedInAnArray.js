var solve = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    let idx = Math.abs(nums[i]) - 1;
    if (nums[idx] > 0) {
      nums[idx] = -nums[idx];
    }
  }
  let ans = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      ans.push(i + 1);
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
