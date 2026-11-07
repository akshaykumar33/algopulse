var firstDayWhereYouHaveBeenInAllTheRooms = function(nextVisit) {
    const MOD = 1000000007;
    const n = nextVisit.length;
    const dp = new Array(n).fill(0);

    for (let i = 0; i < n - 1; i++) {
        let prevEvenVisits = dp[i];
        
        let timeToVisitPrevRoom = dp[i] - dp[nextVisit[i]] + MOD;
        timeToVisitPrevRoom %= MOD;
        
        let timeToReturnToCurrentRoom = timeToVisitPrevRoom + 1;
        timeToReturnToCurrentRoom %= MOD;
        
        let totalTime = prevEvenVisits + timeToReturnToCurrentRoom + 1;
        totalTime %= MOD;
        
        dp[i + 1] = totalTime;
    }

    return dp[n - 1];
};

var solve = typeof firstDayWhereYouHaveBeenInAllTheRooms !== 'undefined' ? firstDayWhereYouHaveBeenInAllTheRooms : null;

// ---------------- LOCAL TEST HARNESS ----------------
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
