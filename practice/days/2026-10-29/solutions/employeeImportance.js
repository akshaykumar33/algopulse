var GetImportance = function(employees, id) {
  const map = new Map();
  for (const emp of employees) {
    map.set(emp.id, emp);
  }

  let total = 0;
  const queue = [id];
  while (queue.length > 0) {
    const curId = queue.shift();
    const emp = map.get(curId);
    if (emp) {
      total += emp.importance;
      for (const subId of emp.subordinates) {
        queue.push(subId);
      }
    }
  }
  return total;
};

var solve = typeof GetImportance !== 'undefined' ? GetImportance : null;

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
