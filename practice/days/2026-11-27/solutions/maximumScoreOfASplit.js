var maximumScore = function(nums) {
  const n = nums.length;
  const suf = new Array(n);
  suf[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) suf[i] = Math.min(nums[i], suf[i + 1]);
  let pre = 0, ans = -Infinity;
  for (let i = 0; i < n - 1; i++) {
    pre += nums[i];
    ans = Math.max(ans, pre - suf[i + 1]);
  }
  return ans;
};
var solve = maximumScore;
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
module.exports = maximumScore;
