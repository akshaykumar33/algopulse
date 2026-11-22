var minOperations = function(nums, k) {
  let x = k;
  for (let i = 0; i < nums.length; i++) x ^= nums[i];
  let ans = 0;
  while (x > 0) {
    ans += (x & 1);
    x >>= 1;
  }
  return ans;
};
var solve = minOperations;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}
module.exports = minOperations;