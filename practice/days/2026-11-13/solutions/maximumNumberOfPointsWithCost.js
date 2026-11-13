var maxPoints = function(points) {
  const m = points.length;
  const n = points[0].length;
  let dp = new Float64Array(n);
  for (let c = 0; c < n; c++) dp[c] = points[0][c];

  const left = new Float64Array(n);
  const right = new Float64Array(n);
  const nextDp = new Float64Array(n);

  for (let r = 1; r < m; r++) {
    left[0] = dp[0];
    for (let c = 1; c < n; c++) {
      left[c] = Math.max(left[c - 1] - 1, dp[c]);
    }

    right[n - 1] = dp[n - 1];
    for (let c = n - 2; c >= 0; c--) {
      right[c] = Math.max(right[c + 1] - 1, dp[c]);
    }

    for (let c = 0; c < n; c++) {
      nextDp[c] = points[r][c] + Math.max(left[c], right[c]);
    }

    for (let c = 0; c < n; c++) {
      dp[c] = nextDp[c];
    }
  }

  let ans = 0;
  for (let c = 0; c < n; c++) {
    if (dp[c] > ans) ans = dp[c];
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(maxPoints(JSON.parse(line))));
    }
  }
}

module.exports = maxPoints;
