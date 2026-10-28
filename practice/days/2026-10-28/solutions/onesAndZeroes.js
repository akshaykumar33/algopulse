var findMaxForm = function(strs, m, n) {
  const dp = Array.from({ length: m + 1 }, () => new Int16Array(n + 1));

  for (let s = 0; s < strs.length; s++) {
    const str = strs[s];
    let z = 0, o = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '0') z++;
      else o++;
    }

    for (let i = m; i >= z; i--) {
      for (let j = n; j >= o; j--) {
        const val = dp[i - z][j - o] + 1;
        if (val > dp[i][j]) dp[i][j] = val;
      }
    }
  }

  return dp[m][n];
};

var solve = function(strs, m, n) {
  return findMaxForm(strs, m, n);
};

// ---------------- LOCAL TEST HARNESS ----------------
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

