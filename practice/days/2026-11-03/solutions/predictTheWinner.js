var predictTheWinner = function(nums) {
    const memo = new Map();
    function helper(i, j) {
        if (i === j) return nums[i];
        const key = i + ',' + j;
        if (memo.has(key)) return memo.get(key);
        const pickI = nums[i] - helper(i + 1, j);
        const pickJ = nums[j] - helper(i, j - 1);
        const res = Math.max(pickI, pickJ);
        memo.set(key, res);
        return res;
    }
    return helper(0, nums.length - 1) >= 0;
};
var solve = typeof predictTheWinner !== 'undefined' ? predictTheWinner : null;

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
