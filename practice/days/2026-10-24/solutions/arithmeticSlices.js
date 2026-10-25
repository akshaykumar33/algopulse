var numberOfArithmeticSlices = function(nums) {
  let n = nums.length;
  if (n < 3) return 0;
  let ans = 0;
  let cnt = 0;
  for (let i = 2; i < n; i++) {
    if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
      cnt++;
      ans += cnt;
    } else {
      cnt = 0;
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && numberOfArithmeticSlices.length > 1 ? numberOfArithmeticSlices(...parsed) : numberOfArithmeticSlices(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(numberOfArithmeticSlices(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = numberOfArithmeticSlices;
