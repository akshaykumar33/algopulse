var clearDigits = function(s) {
  let stack = [];
  for (let char of s) {
    if (char >= '0' && char <= '9') {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(char);
    }
  }
  return stack.join('');
};
var solve = clearDigits;

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
