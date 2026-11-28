var minimumBeautifulSubstrings = function(s) {
  const good = new Set();
  for (let p = 1; p < 1 << 16; p *= 5) good.add(p.toString(2));
  const n = s.length;
  const dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 0; i < n; i++) {
    if (dp[i] === Infinity || s[i] === '0') continue;
    for (let j = i + 1; j <= n; j++) {
      if (good.has(s.slice(i, j)) && dp[i] + 1 < dp[j]) dp[j] = dp[i] + 1;
    }
  }
  return dp[n] === Infinity ? -1 : dp[n];
};
var solve = minimumBeautifulSubstrings;
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
module.exports = minimumBeautifulSubstrings;
