var solve = function(nums) {
  let dp = [];
  for (let x of nums) {
    let l = 0, r = dp.length;
    while (l < r) {
      let mid = (l + r) >> 1;
      if (dp[mid] < x) {
        l = mid + 1;
      } else {
        r = mid;
      }
    }
    dp[l] = x;
  }
  return dp.length;
};

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
