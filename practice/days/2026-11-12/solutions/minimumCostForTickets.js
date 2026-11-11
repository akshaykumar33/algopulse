var mincostTickets = function(days, costs) {
  const lastDay = days[days.length - 1];
  const travel = new Uint8Array(lastDay + 1);
  for (let i = 0; i < days.length; i++) travel[days[i]] = 1;
  const dp = new Int32Array(lastDay + 1);
  for (let d = 1; d <= lastDay; d++) {
    if (!travel[d]) {
      dp[d] = dp[d - 1];
    } else {
      const c1 = dp[d - 1] + costs[0];
      const c7 = dp[d >= 7 ? d - 7 : 0] + costs[1];
      const c30 = dp[d >= 30 ? d - 30 : 0] + costs[2];
      dp[d] = Math.min(c1, c7, c30);
    }
  }
  return dp[lastDay];
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    const isPacked = parsed.every((p) => Array.isArray(p) && p.length === 2 && Array.isArray(p[0]));
    if (parsed.length === 2 && !isPacked) {
      console.log(JSON.stringify(mincostTickets(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(mincostTickets(...p)));
      }
    }
  }
}

module.exports = mincostTickets;
