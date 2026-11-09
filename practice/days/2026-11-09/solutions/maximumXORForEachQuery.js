var getMaximumXor = function(nums, maximumBit) {
  const n = nums.length;
  const mask = (1 << maximumBit) - 1;
  let cur = 0;
  for (let i = 0; i < n; i++) cur ^= nums[i];
  const ans = new Array(n);
  for (let i = 0; i < n; i++) {
    ans[i] = cur ^ mask;
    cur ^= nums[n - 1 - i];
  }
  return ans;
};

var solve = getMaximumXor;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = solve;
