/**
 * LeetCode Problem Solution: Isomorphic Strings
 */
var isIsomorphic = function(s, t) {
  if (s.length !== t.length) return false;
  const m1 = {};
  const m2 = {};
  for (let i = 0; i < s.length; i++) {
    const c1 = s[i];
    const c2 = t[i];
    if ((m1[c1] && m1[c1] !== c2) || (m2[c2] && m2[c2] !== c1)) {
      return false;
    }
    m1[c1] = c2;
    m2[c2] = c1;
  }
  return true;
};

var solve = function(s, t) {
  return isIsomorphic(s, t);
};

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
          console.log(solve(line));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
