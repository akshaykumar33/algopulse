var maxArrayValue = function(nums) {
  let cur = nums[nums.length - 1];
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] <= cur) cur += nums[i];
    else cur = nums[i];
  }
  return cur;
};
var solve = maxArrayValue;
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
module.exports = maxArrayValue;