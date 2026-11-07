var minElements = function(nums, limit, goal) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) sum += nums[i];
  const diff = Math.abs(goal - sum);
  return Math.ceil(diff / limit);
};

var solve = typeof minElements !== 'undefined' ? minElements : null;

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
  } catch (err) {}
}
module.exports = { minElements, solve };
