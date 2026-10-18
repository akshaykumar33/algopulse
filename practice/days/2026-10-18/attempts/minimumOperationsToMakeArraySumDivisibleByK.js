var solve = function(nums, k) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum % k;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        if (i + 1 < lines.length) {
          const nums = JSON.parse(lines[i]);
          const k = JSON.parse(lines[i+1]);
          const result = solve(nums, k);
          console.log(JSON.stringify(result));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
