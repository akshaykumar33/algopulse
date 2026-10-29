var frequencySort = function(s) {
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    map.set(c, (map.get(c) || 0) + 1);
  }
  const entries = Array.from(map.entries());
  entries.sort((a, b) => b[1] - a[1]);
  let res = '';
  for (const [c, f] of entries) {
    res += c.repeat(f);
  }
  return res;
};

var solve = typeof frequencySort !== 'undefined' ? frequencySort : null;

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
