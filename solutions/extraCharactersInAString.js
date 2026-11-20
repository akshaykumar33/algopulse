var minExtraChar = function(s, dictionary) {
  const n = s.length;
  const dict = new Set(dictionary);
  const dp = new Int32Array(n + 1);
  for (let i = n - 1; i >= 0; i--) {
    dp[i] = dp[i + 1] + 1;
    for (let j = i + 1; j <= n; j++) {
      if (dict.has(s.slice(i, j))) {
        dp[i] = Math.min(dp[i], dp[j]);
      }
    }
  }
  return dp[0];
};

var solve = minExtraChar;

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

module.exports = minExtraChar;