var longestPalindromicSubsequence = function(s, k) {
  const n = s.length;
  const dp = [];
  for (let i = 0; i < n; i++) {
    dp.push([]);
    for (let j = 0; j < n; j++) dp[i].push(new Int32Array(k + 1));
  }
  for (let i = 0; i < n; i++) {
    for (let op = 0; op <= k; op++) dp[i][i][op] = 1;
  }
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      const c1 = s.charCodeAt(i) - 97;
      const c2 = s.charCodeAt(j) - 97;
      const diff = Math.abs(c1 - c2);
      const cost = Math.min(diff, 26 - diff);
      for (let op = 0; op <= k; op++) {
        let best = Math.max(dp[i + 1][j][op], dp[i][j - 1][op]);
        if (op >= cost) {
          best = Math.max(best, (len === 2 ? 0 : dp[i + 1][j - 1][op - cost]) + 2);
        }
        dp[i][j][op] = best;
      }
    }
  }
  return dp[0][n - 1][k];
};
var solve = longestPalindromicSubsequence;
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
module.exports = longestPalindromicSubsequence;
