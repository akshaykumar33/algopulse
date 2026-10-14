var targetIndices = function(nums, target) {
  nums.sort((a, b) => a - b);
  let ans = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      ans.push(i);
    }
  }
  return ans;
};

var solve = function(nums, target) {
  return targetIndices(nums, target);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        try {
          const nums = JSON.parse(lines[i]);
          const target = JSON.parse(lines[i + 1]);
          const result = solve(nums, target);
          console.log(JSON.stringify(result));
        } catch (err) {
          console.error('Local runner error:', err.message);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
