var minimizeArrayValue = function(nums) {
  let sum = 0, ans = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    const v = Math.ceil(sum / (i + 1));
    if (v > ans) ans = v;
  }
  return ans;
};
var solve = minimizeArrayValue;
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
module.exports = minimizeArrayValue;
