var maximumScore = function(a, b, c) {
  const [x, y, z] = [a, b, c].sort((u, v) => u - v);
  return x + y <= z ? x + y : Math.floor((x + y + z) / 2);
};

var maximumScoreFromRemovingStones = maximumScore;
var solve = typeof maximumScoreFromRemovingStones !== 'undefined' ? maximumScoreFromRemovingStones : null;

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
