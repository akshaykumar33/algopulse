var resilientSubarray = function(nums, k) {
  const n = nums.length;
  let ans = 1;
  for (let l = 0; l < n; l++) {
    const r0 = nums[l] % k;
    for (let r = l; r < n && nums[r] % k === r0; r++) {
      const len = r - l + 1;
      if (len > ans && ((len - 1) * r0) % k === 0) ans = len;
    }
  }
  return ans;
};
var solve = resilientSubarray;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = resilientSubarray;
