var minMoves2 = function(nums) {
  nums.sort((a, b) => a - b);
  let median = nums[Math.floor(nums.length / 2)];
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    ans += Math.abs(nums[i] - median);
  }
  return ans;
};
var solve = typeof minMoves2 !== 'undefined' ? minMoves2 : null;

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
