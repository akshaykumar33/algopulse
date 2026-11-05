var rankTeamsByVotes = function(votes) {
    const n = votes[0].length;
    const map = new Map();
    for (const v of votes) {
        for (let i = 0; i < n; i++) {
            const c = v[i];
            if (!map.has(c)) {
                map.set(c, new Array(n).fill(0));
            }
            map.get(c)[i]++;
        }
    }
    const arr = Array.from(map.keys());
    arr.sort((a, b) => {
        const cntA = map.get(a);
        const cntB = map.get(b);
        for (let i = 0; i < n; i++) {
            if (cntA[i] !== cntB[i]) {
                return cntB[i] - cntA[i];
            }
        }
        return a.localeCompare(b);
    });
    return arr.join('');
};
var solve = typeof rankTeamsByVotes !== 'undefined' ? rankTeamsByVotes : null;

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
