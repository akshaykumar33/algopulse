var solve = function(s) {
    let low = 0;
    let high = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            low++;
            high++;
        } else if (s[i] === ')') {
            low = Math.max(0, low - 1);
            high--;
        } else {
            low = Math.max(0, low - 1);
            high++;
        }
        if (high < 0) return false;
    }
    return low === 0;
};

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
