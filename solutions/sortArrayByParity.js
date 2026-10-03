var solve = function(nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    if (nums[l] % 2 > nums[r] % 2) {
      let t = nums[l];
      nums[l] = nums[r];
      nums[r] = t;
    }
    if (nums[l] % 2 === 0) l++;
    if (nums[r] % 2 !== 0) r--;
  }
  return nums;
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
