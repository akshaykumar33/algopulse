var maxSideLength = function(mat, threshold) {
  const m = mat.length;
  const n = mat[0].length;
  const p = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      p[i][j] = mat[i - 1][j - 1] + p[i - 1][j] + p[i][j - 1] - p[i - 1][j - 1];
    }
  }
  let ans = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      while (
        i + ans < m &&
        j + ans < n &&
        p[i + ans + 1][j + ans + 1] - p[i][j + ans + 1] - p[i + ans + 1][j] + p[i][j] <= threshold
      ) {
        ans++;
      }
    }
  }
  return ans;
};

var solve = maxSideLength;
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
    console.error(err);
  }
}
module.exports = solve;
