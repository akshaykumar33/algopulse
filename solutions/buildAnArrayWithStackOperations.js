var buildAnArrayWithStackOperations = function(target, n) {
  const ans = [];
  let cur = 1;
  for (let i = 0; i < target.length; i++) {
    const val = target[i];
    while (cur < val) {
      ans.push('Push');
      ans.push('Pop');
      cur++;
    }
    ans.push('Push');
    cur++;
  }
  return ans;
};

var solve = typeof buildAnArrayWithStackOperations !== 'undefined' ? buildAnArrayWithStackOperations : null;

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

