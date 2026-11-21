var maxScore = function(a, b) {
  const negInf = -1e18;
  let dp0 = negInf, dp1 = negInf, dp2 = negInf, dp3 = negInf;
  for (let i = 0; i < b.length; i++) {
    const x = b[i];
    if (dp2 !== negInf) dp3 = Math.max(dp3, dp2 + a[3] * x);
    if (dp1 !== negInf) dp2 = Math.max(dp2, dp1 + a[2] * x);
    if (dp0 !== negInf) dp1 = Math.max(dp1, dp0 + a[1] * x);
    dp0 = Math.max(dp0, a[0] * x);
  }
  return dp3;
};

var solve = maxScore;

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

module.exports = maxScore;