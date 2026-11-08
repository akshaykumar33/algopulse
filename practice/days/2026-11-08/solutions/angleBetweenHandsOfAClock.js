var angleClock = function(hour, minutes) {
  const hDeg = (hour % 12) * 30 + minutes * 0.5;
  const mDeg = minutes * 6;
  const diff = Math.abs(hDeg - mDeg);
  return Math.min(diff, 360 - diff);
};

var solve = angleClock;
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
