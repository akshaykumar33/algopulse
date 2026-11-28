var maximumBeauty = function(nums, k) {
  nums.sort((a, b) => a - b);
  let l = 0, ans = 0;
  for (let r = 0; r < nums.length; r++) {
    while (nums[r] - nums[l] > 2 * k) l++;
    if (r - l + 1 > ans) ans = r - l + 1;
  }
  return ans;
};
var solve = maximumBeauty;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = maximumBeauty;
