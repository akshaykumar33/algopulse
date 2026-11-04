var stoneGameII = function(piles) {
  const n = piles.length;
  const suffix = new Int32Array(n + 1);
  for (let i = n - 1; i >= 0; i--) {
    suffix[i] = suffix[i + 1] + piles[i];
  }

  const memo = Array.from({ length: n + 1 }, () => new Int32Array(n + 1).fill(-1));

  function dp(i, m) {
    if (i >= n) return 0;
    if (i + 2 * m >= n) return suffix[i];
    if (memo[i][m] !== -1) return memo[i][m];

    let minNext = Infinity;
    for (let x = 1; x <= 2 * m; x++) {
      const nextM = Math.max(m, x);
      const val = dp(i + x, nextM);
      if (val < minNext) minNext = val;
    }

    const res = suffix[i] - minNext;
    memo[i][m] = res;
    return res;
  }

  return dp(0, 1);
};

var solve = typeof stoneGameII !== 'undefined' ? stoneGameII : null;

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
