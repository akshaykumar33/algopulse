var flipgame = function(fronts, backs) {
  const same = new Set();
  const n = fronts.length;
  for (let i = 0; i < n; i++) {
    if (fronts[i] === backs[i]) same.add(fronts[i]);
  }
  let ans = Infinity;
  for (let i = 0; i < n; i++) {
    if (!same.has(fronts[i]) && fronts[i] < ans) ans = fronts[i];
    if (!same.has(backs[i]) && backs[i] < ans) ans = backs[i];
  }
  return ans === Infinity ? 0 : ans;
};

var solve = typeof flipgame !== 'undefined' ? flipgame : null;

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
module.exports = { flipgame, solve };
