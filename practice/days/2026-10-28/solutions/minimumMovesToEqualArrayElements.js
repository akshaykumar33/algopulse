var minMoves = function(nums) {
  let minVal = nums[0];
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < minVal) minVal = nums[i];
    sum += nums[i];
  }
  return sum - minVal * nums.length;
};

var solve = function(nums) {
  return minMoves(nums);
};

// ---------------- LOCAL TEST HARNESS ----------------
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

