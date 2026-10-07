var countBinarySubstrings = function(s) {
    let ans = 0;
    let prev = 0;
    let cur = 1;
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            cur++;
        } else {
            ans += Math.min(prev, cur);
            prev = cur;
            cur = 1;
        }
    }
    ans += Math.min(prev, cur);
    return ans;
};

var solve = countBinarySubstrings;

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
