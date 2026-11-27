var minTotalCost = function(nums, costs) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) ans += nums[i] * costs[i];
  return ans;
};
var solve = minTotalCost;
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
module.exports = minTotalCost;
