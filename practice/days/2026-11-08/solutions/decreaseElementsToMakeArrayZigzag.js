var movesToMakeZigzag = function(nums) {
  let ans0 = 0, ans1 = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let left = i > 0 ? nums[i - 1] : Infinity;
    let right = i + 1 < n ? nums[i + 1] : Infinity;
    let target = Math.min(left, right) - 1;
    let diff = nums[i] > target ? nums[i] - target : 0;
    if (i % 2 === 0) ans0 += diff;
    else ans1 += diff;
  }
  return Math.min(ans0, ans1);
};

var solve = movesToMakeZigzag;
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
module.exports = solve;
