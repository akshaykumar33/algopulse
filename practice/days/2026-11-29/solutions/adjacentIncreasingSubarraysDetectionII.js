var maxIncreasingSubarrays = function(nums) {
  let prev = 0, cur = 1, ans = 0;
  for (let i = 1; i <= nums.length; i++) {
    if (i < nums.length && nums[i] > nums[i - 1]) cur++;
    else {
      ans = Math.max(ans, cur >> 1, Math.min(prev, cur));
      prev = cur;
      cur = 1;
    }
  }
  return ans;
};
var solve = maxIncreasingSubarrays;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = maxIncreasingSubarrays;
