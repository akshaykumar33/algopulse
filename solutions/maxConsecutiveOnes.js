var findMaxConsecutiveOnes = function(nums) {
  let max = 0, cur = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      cur++;
      if (cur > max) max = cur;
    } else {
      cur = 0;
    }
  }
  return max;
};
var solve = findMaxConsecutiveOnes;

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
