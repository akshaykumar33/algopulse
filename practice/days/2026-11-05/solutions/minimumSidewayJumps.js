var minimumSidewayJumps = function(obstacles) {
    let dp = [1, 0, 1];
    for (let i = 1; i < obstacles.length; i++) {
        let next = [1e9, 1e9, 1e9];
        let obs = obstacles[i] - 1;
        for (let j = 0; j < 3; j++) {
            if (j === obs) continue;
            next[j] = dp[j];
        }
        for (let j = 0; j < 3; j++) {
            if (j === obs) continue;
            let alt1 = (j + 1) % 3;
            let alt2 = (j + 2) % 3;
            if (alt1 !== obs) next[j] = Math.min(next[j], next[alt1] + 1);
            if (alt2 !== obs) next[j] = Math.min(next[j], next[alt2] + 1);
        }
        dp = next;
    }
    return Math.min(dp[0], dp[1], dp[2]);
};
var solve = typeof minimumSidewayJumps !== 'undefined' ? minimumSidewayJumps : null;

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
