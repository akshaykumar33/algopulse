var minOperations = function(nums) {
  const seen = new Uint8Array(100001);
  for (let i = nums.length - 1; i >= 0; i--) {
    if (seen[nums[i]]) return Math.ceil((i + 1) / 3);
    seen[nums[i]] = 1;
  }
  return 0;
};
var solve = minOperations;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = minOperations;
