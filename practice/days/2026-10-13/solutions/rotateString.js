var solve = function(s, goal) {
  if (s.length !== goal.length) return false;
  return (s + s).includes(goal);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const s = JSON.parse(lines[i]);
        const goal = JSON.parse(lines[i+1]);
        const res = solve(s, goal);
        console.log(JSON.stringify(res));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
