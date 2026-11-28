var longestSubarray = function(nums) {
  let ans = 2, cur = 2;
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] === nums[i - 1] + nums[i - 2]) cur++;
    else cur = 2;
    if (cur > ans) ans = cur;
  }
  return ans;
};
var solve = longestSubarray;
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
module.exports = longestSubarray;
