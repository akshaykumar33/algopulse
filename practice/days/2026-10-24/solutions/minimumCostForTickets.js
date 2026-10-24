var mincostTickets = function(days, costs) {
    const lastDay = days[days.length - 1];
    const dp = new Array(lastDay + 1).fill(0);
    const daySet = new Set(days);
    for (let i = 1; i <= lastDay; i++) {
        if (!daySet.has(i)) {
            dp[i] = dp[i - 1];
        } else {
            const c1 = dp[i - 1] + costs[0];
            const c7 = dp[Math.max(0, i - 7)] + costs[1];
            const c30 = dp[Math.max(0, i - 30)] + costs[2];
            dp[i] = Math.min(c1, c7, c30);
        }
    }
    return dp[lastDay];
};

var solve = function(days, costs) {
    return mincostTickets(days, costs);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const days = JSON.parse(lines[i]);
        const costs = JSON.parse(lines[i+1]);
        const result = solve(days, costs);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
