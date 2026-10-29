var findConsecutiveNums = function(logs) {
  const res = new Set();
  for (let i = 0; i < logs.length - 2; i++) {
    if (logs[i].num === logs[i + 1].num && logs[i].num === logs[i + 2].num) {
      res.add(logs[i].num);
    }
  }
  return Array.from(res);
};

var solve = typeof findConsecutiveNums !== 'undefined' ? findConsecutiveNums : null;

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
