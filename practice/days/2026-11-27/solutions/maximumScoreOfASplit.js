var maxScore = function(nums) {
  let ans = -Infinity;
  let pref = 0;
  let total = 0;
  for (const x of nums) total += x;
  for (let i = 0; i < nums.length - 1; i++) {
    pref += nums[i];
    const suff = total - pref;
    const score = pref * suff;
    if (score > ans) ans = score;
  }
  return ans;
};
var solve = maxScore;
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
module.exports = maxScore;
