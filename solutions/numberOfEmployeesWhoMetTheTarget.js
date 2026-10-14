var numberOfEmployeesWhoMetTarget = function(hours, target) {
    let ans = 0;
    for (let i = 0; i < hours.length; i++) {
        if (hours[i] >= target) {
            ans++;
        }
    }
    return ans;
};

var solve = numberOfEmployeesWhoMetTarget;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        try {
          const hours = JSON.parse(lines[i]);
          const target = JSON.parse(lines[i + 1]);
          const result = solve(hours, target);
          console.log(JSON.stringify(result));
        } catch (err) {
          console.error('Local runner error:', err.message);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
