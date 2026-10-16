var isValid = function(s) {
  if (s.length % 2 !== 0) return false;
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (map[c]) {
      if (stack.length === 0 || stack[stack.length - 1] !== map[c]) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(c);
    }
  }
  return stack.length === 0;
};

var solve = isValid;

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
