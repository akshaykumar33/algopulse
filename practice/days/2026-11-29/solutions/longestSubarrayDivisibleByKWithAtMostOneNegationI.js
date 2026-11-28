var longestSubarray = function(nums, k) {
  const n = nums.length;
  const md = x => ((x % k) + k) % k;
  const seen = new Int32Array(k).fill(-1);
  let ans = 0;
  for (let l = 0; l < n; l++) {
    let sum = 0;
    for (let r = l; r < n; r++) {
      sum = md(sum + nums[r]);
      seen[md(2 * nums[r])] = l;
      if ((sum === 0 || seen[sum] === l) && r - l + 1 > ans) ans = r - l + 1;
    }
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
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = longestSubarray;
