var minInsertions = function(s) {
    let ans = 0;
    let need = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            need += 2;
            if (need % 2 !== 0) {
                ans++;
                need--;
            }
        } else {
            need--;
            if (need < 0) {
                ans++;
                need += 2;
            }
        }
    }
    return ans + need;
};
var solve = typeof minInsertions !== 'undefined' ? minInsertions : null;
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
