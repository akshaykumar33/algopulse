var optimalDivision = function(nums) {
  if (nums.length === 1) return nums[0].toString();
  if (nums.length === 2) return nums[0] + "/" + nums[1];
  return nums[0] + "/(" + nums.slice(1).join('/') + ")";
};

var solve = function(nums) {
  return optimalDivision(nums);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
