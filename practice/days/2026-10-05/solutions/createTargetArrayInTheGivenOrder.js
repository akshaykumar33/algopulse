var createTargetArray = function(nums, index) {
  let target = [];
  for (let i = 0; i < nums.length; i++) {
    target.splice(index[i], 0, nums[i]);
  }
  return target;
};

var solve = function(nums, index) {
  return createTargetArray(nums, index);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let nums = null;
      for (const line of lines) {
        const parsed = JSON.parse(line);
        if (nums === null) {
          nums = parsed;
        } else {
          const result = solve(nums, parsed);
          console.log(JSON.stringify(result));
          nums = null;
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
