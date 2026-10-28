var averageWaitingTime = function(customers) {
  let curTime = 0;
  let totalWait = 0;
  for (let i = 0; i < customers.length; i++) {
    const arr = customers[i][0];
    const cook = customers[i][1];
    if (curTime < arr) curTime = arr;
    curTime += cook;
    totalWait += curTime - arr;
  }
  return totalWait / customers.length;
};

var solve = function(customers) {
  return averageWaitingTime(customers);
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
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

