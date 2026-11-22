var largestPerimeter = function(nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let sum = 0;
  for (let i = 0; i < n; i++) sum += nums[i];
  for (let i = n - 1; i >= 2; i--) {
    sum -= nums[i];
    if (sum > nums[i]) return sum + nums[i];
  }
  return -1;
};
var solve = largestPerimeter;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0])));
    }
  } catch (e) {}
}
module.exports = largestPerimeter;