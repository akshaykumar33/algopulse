var minOperations = function(nums) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i + 1) {
      const target = nums[i] - 1;
      const tmp = nums[i];
      nums[i] = nums[target];
      nums[target] = tmp;
      ans++;
    }
  }
  return ans;
};
var solve = minOperations;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = minOperations;
