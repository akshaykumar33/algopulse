var minCostClimbingStairs = function(cost) {
    let n = cost.length;
    let prev2 = cost[0];
    let prev1 = cost[1];
    for (let i = 2; i < n; i++) {
        let cur = cost[i] + Math.min(prev1, prev2);
        prev2 = prev1;
        prev1 = cur;
    }
    return Math.min(prev1, prev2);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && minCostClimbingStairs.length > 1 ? minCostClimbingStairs(...parsed) : minCostClimbingStairs(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(minCostClimbingStairs(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = minCostClimbingStairs;
