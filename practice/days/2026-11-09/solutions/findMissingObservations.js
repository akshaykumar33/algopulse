var missingRolls = function(rolls, mean, n) {
  const m = rolls.length;
  let cur = 0;
  for (let i = 0; i < m; i++) cur += rolls[i];
  const target = mean * (m + n) - cur;
  if (target < n || target > 6 * n) return [];
  const base = Math.floor(target / n);
  const rem = target % n;
  const ans = new Array(n).fill(base);
  for (let i = 0; i < rem; i++) ans[i]++;
  return ans;
};

var solve = missingRolls;

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
module.exports = solve;
