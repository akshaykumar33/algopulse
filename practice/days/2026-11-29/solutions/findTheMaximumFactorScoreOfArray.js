var maxScore = function(nums) {
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const n = nums.length;
  let ans = 0;
  for (let skip = -1; skip < n; skip++) {
    let g = 0, l = 1, any = false;
    for (let i = 0; i < n; i++) {
      if (i === skip) continue;
      any = true;
      g = gcd(g, nums[i]);
      l = l / gcd(l, nums[i]) * nums[i];
    }
    if (any) ans = Math.max(ans, g * l);
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
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = maxScore;
