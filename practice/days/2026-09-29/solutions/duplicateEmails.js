/**
 * LeetCode Problem Solution
 */
var solve = function(emails) {
  if (Array.isArray(emails)) {
    const counts = {};
    for (const e of emails) {
      const email = typeof e === 'object' ? e.email : e;
      counts[email] = (counts[email] || 0) + 1;
    }
    return Object.keys(counts).filter((e) => counts[e] > 1);
  }
  return "SELECT email FROM Person GROUP BY email HAVING COUNT(email) > 1";
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
