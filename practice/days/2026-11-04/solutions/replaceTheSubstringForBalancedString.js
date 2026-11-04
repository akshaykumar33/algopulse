var replaceTheSubstringForBalancedString = function(s) {
  const n = s.length;
  const k = n / 4;
  const count = { Q: 0, W: 0, E: 0, R: 0 };
  for (let i = 0; i < n; i++) {
    count[s[i]]++;
  }

  if (count.Q <= k && count.W <= k && count.E <= k && count.R <= k) {
    return 0;
  }

  let ans = n;
  let l = 0;
  for (let r = 0; r < n; r++) {
    count[s[r]]--;
    while (count.Q <= k && count.W <= k && count.E <= k && count.R <= k) {
      ans = Math.min(ans, r - l + 1);
      count[s[l]]++;
      l++;
    }
  }

  return ans;
};

var solve = typeof replaceTheSubstringForBalancedString !== 'undefined' ? replaceTheSubstringForBalancedString : null;

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

