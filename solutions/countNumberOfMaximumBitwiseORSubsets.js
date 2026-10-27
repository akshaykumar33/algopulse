var countNumberOfMaximumBitwiseORSubsets = function(nums) {
    let maxOr = 0;
    for (let x of nums) maxOr |= x;
    let ans = 0;
    const dfs = (idx, cur) => {
        if (idx === nums.length) {
            if (cur === maxOr) ans++;
            return;
        }
        dfs(idx + 1, cur);
        dfs(idx + 1, cur | nums[idx]);
    };
    dfs(0, 0);
    return ans;
};
var solve = typeof countNumberOfMaximumBitwiseORSubsets !== 'undefined' ? countNumberOfMaximumBitwiseORSubsets : null;

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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
