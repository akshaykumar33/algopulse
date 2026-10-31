var nthUglyNumber = function(n) {
  const dp = new Array(n);
  dp[0] = 1;
  let i2 = 0, i3 = 0, i5 = 0;
  for (let i = 1; i < n; i++) {
    const next2 = dp[i2] * 2;
    const next3 = dp[i3] * 3;
    const next5 = dp[i5] * 5;
    const next = Math.min(next2, next3, next5);
    dp[i] = next;
    if (next === next2) i2++;
    if (next === next3) i3++;
    if (next === next5) i5++;
  }
  return dp[n - 1];
};
var solve = nthUglyNumber;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(Number(line))));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
