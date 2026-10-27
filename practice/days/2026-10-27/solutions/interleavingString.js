var isInterleave = function(s1, s2, s3) {
    const n = s1.length;
    const m = s2.length;
    const l = s3.length;
    if (n + m !== l) return false;
    const dp = Array(m + 1).fill(false);
    dp[0] = true;
    for (let j = 1; j <= m; j++) {
        dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
    }
    for (let i = 1; i <= n; i++) {
        dp[0] = dp[0] && s1[i - 1] === s3[i - 1];
        for (let j = 1; j <= m; j++) {
            dp[j] = (dp[j] && s1[i - 1] === s3[i - 1 + j]) || (dp[j - 1] && s2[j - 1] === s3[i - 1 + j]);
        }
    }
    return dp[m];
};
var solve = isInterleave;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 3) {
        if (i + 2 < lines.length) {
          const s1 = JSON.parse(lines[i]);
          const s2 = JSON.parse(lines[i+1]);
          const s3 = JSON.parse(lines[i+2]);
          console.log(JSON.stringify(solve(s1, s2, s3)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
