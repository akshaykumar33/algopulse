var findLonely = function(nums) {
  const cnt = new Map();
  for (let i = 0; i < nums.length; i++) {
    cnt.set(nums[i], (cnt.get(nums[i]) || 0) + 1);
  }
  const ans = [];
  for (const [x, c] of cnt.entries()) {
    if (c === 1 && !cnt.has(x - 1) && !cnt.has(x + 1)) {
      ans.push(x);
    }
  }
  return ans;
};

var solve = findLonely;
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
    console.error(err);
  }
}
module.exports = solve;
