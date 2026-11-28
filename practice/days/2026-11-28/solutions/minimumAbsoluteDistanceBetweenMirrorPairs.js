var minMirrorPairDistance = function(nums) {
  const last = new Map();
  let ans = Infinity;
  for (let j = 0; j < nums.length; j++) {
    if (last.has(nums[j])) ans = Math.min(ans, j - last.get(nums[j]));
    let x = nums[j], r = 0;
    while (x > 0) { r = r * 10 + x % 10; x = Math.floor(x / 10); }
    last.set(r, j);
  }
  return ans === Infinity ? -1 : ans;
};
var solve = minMirrorPairDistance;
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
module.exports = minMirrorPairDistance;
