var findDiagonalOrder = function(nums) {
  const buckets = [];
  for (let r = nums.length - 1; r >= 0; r--) {
    for (let c = 0; c < nums[r].length; c++) {
      const d = r + c;
      if (!buckets[d]) buckets[d] = [];
      buckets[d].push(nums[r][c]);
    }
  }
  const ans = [];
  for (let d = 0; d < buckets.length; d++) {
    if (buckets[d]) {
      for (let i = 0; i < buckets[d].length; i++) {
        ans.push(buckets[d][i]);
      }
    }
  }
  return ans;
};

var solve = typeof findDiagonalOrder !== 'undefined' ? findDiagonalOrder : null;

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
module.exports = { findDiagonalOrder, solve };
