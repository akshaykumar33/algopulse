var rankScores = function(scores) {
  const sorted = Array.from(new Set(scores.map(s => s.score))).sort((a, b) => b - a);
  const rankMap = new Map();
  for (let i = 0; i < sorted.length; i++) {
    rankMap.set(sorted[i], i + 1);
  }
  return scores
    .slice()
    .sort((a, b) => b.score - a.score)
    .map(s => ({ score: s.score, rank: rankMap.get(s.score) }));
};

var solve = typeof rankScores !== 'undefined' ? rankScores : null;

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
