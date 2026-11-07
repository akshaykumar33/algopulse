var maxCompatibilitySum = function(students, mentors) {
  const m = students.length;
  const q = students[0].length;
  const score = Array.from({ length: m }, () => new Int32Array(m));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      let s = 0;
      for (let k = 0; k < q; k++) {
        if (students[i][k] === mentors[j][k]) s++;
      }
      score[i][j] = s;
    }
  }
  const dp = new Int32Array(1 << m).fill(-1);
  dp[0] = 0;
  for (let mask = 0; mask < (1 << m); mask++) {
    if (dp[mask] === -1) continue;
    let i = 0;
    for (let b = 0; b < m; b++) if ((mask >> b) & 1) i++;
    if (i === m) continue;
    for (let j = 0; j < m; j++) {
      if (!((mask >> j) & 1)) {
        const nextMask = mask | (1 << j);
        const val = dp[mask] + score[i][j];
        if (val > dp[nextMask]) dp[nextMask] = val;
      }
    }
  }
  return dp[(1 << m) - 1];
};

var solve = typeof maxCompatibilitySum !== 'undefined' ? maxCompatibilitySum : null;

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
  } catch (err) {}
}
module.exports = { maxCompatibilitySum, solve };
