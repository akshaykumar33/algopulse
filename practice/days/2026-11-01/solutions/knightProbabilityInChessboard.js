var knightProbability = function(n, k, row, column) {
    let dp = Array.from({ length: n }, () => new Array(n).fill(0));
    dp[row][column] = 1;
    const moves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    for (let step = 0; step < k; step++) {
        let nextDp = Array.from({ length: n }, () => new Array(n).fill(0));
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                if (dp[r][c] > 0) {
                    for (const [dr, dc] of moves) {
                        let nr = r + dr;
                        let nc = c + dc;
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                            nextDp[nr][nc] += dp[r][c] / 8;
                        }
                    }
                }
            }
        }
        dp = nextDp;
    }
    let ans = 0;
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            ans += dp[r][c];
        }
    }
    return ans;
};
var solve = typeof knightProbability !== 'undefined' ? knightProbability : null;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 4) {
        const n = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i+1]);
        const r = JSON.parse(lines[i+2]);
        const c = JSON.parse(lines[i+3]);
        const result = solve(n, k, r, c);
        console.log(result);
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
