var minimumRemoval = function(beans) {
  beans.sort((a, b) => a - b);
  const n = beans.length;
  let total = 0;
  for (let i = 0; i < n; i++) {
    total += beans[i];
  }
  let maxRemaining = 0;
  for (let i = 0; i < n; i++) {
    const remaining = beans[i] * (n - i);
    if (remaining > maxRemaining) {
      maxRemaining = remaining;
    }
  }
  return total - maxRemaining;
};

var solve = minimumRemoval;

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
