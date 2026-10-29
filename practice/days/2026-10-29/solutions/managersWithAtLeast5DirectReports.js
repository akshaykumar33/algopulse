var findManagers = function(employees) {
  const counts = new Map();
  for (const emp of employees) {
    if (emp.managerId !== null && emp.managerId !== undefined) {
      counts.set(emp.managerId, (counts.get(emp.managerId) || 0) + 1);
    }
  }

  const validManagerIds = new Set();
  for (const [mId, cnt] of counts.entries()) {
    if (cnt >= 5) validManagerIds.add(mId);
  }

  const res = [];
  for (const emp of employees) {
    if (validManagerIds.has(emp.id)) {
      res.push(emp.name);
    }
  }
  return res;
};

var solve = typeof findManagers !== 'undefined' ? findManagers : null;

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
