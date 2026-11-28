var specialTriplets = function(nums) {
  const MOD = 1000000007;
  const right = new Int32Array(200001), left = new Int32Array(200001);
  for (const x of nums) right[x]++;
  let ans = 0;
  for (const x of nums) {
    right[x]--;
    ans = (ans + left[2 * x] * right[2 * x]) % MOD;
    left[x]++;
  }
  return ans;
};
var solve = specialTriplets;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = specialTriplets;
