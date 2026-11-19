var minimumDeletions = function(nums) {
  const n = nums.length;
  if (n <= 2) return n;

  let minIdx = 0;
  let maxIdx = 0;
  for (let i = 1; i < n; i++) {
    if (nums[i] < nums[minIdx]) minIdx = i;
    if (nums[i] > nums[maxIdx]) maxIdx = i;
  }

  const a = Math.min(minIdx, maxIdx);
  const b = Math.max(minIdx, maxIdx);

  const opt1 = b + 1;
  const opt2 = n - a;
  const opt3 = (a + 1) + (n - b);

  return Math.min(opt1, opt2, opt3);
};

var solve = minimumDeletions;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      const arg = Array.isArray(parsed) && parsed.length === 1 ? parsed[0] : parsed;
      console.log(JSON.stringify(solve(arg)));
    }
  } catch (e) {}
}

module.exports = minimumDeletions;
