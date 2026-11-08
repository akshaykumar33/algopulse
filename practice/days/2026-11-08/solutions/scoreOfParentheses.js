var scoreOfParentheses = function(s) {
  let depth = 0;
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      depth++;
    } else {
      depth--;
      if (s[i - 1] === '(') {
        ans += 1 << depth;
      }
    }
  }
  return ans;
};

var solve = scoreOfParentheses;
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
  } catch (err) {}
}
module.exports = solve;
