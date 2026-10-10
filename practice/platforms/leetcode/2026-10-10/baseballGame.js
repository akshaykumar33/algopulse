var calPoints = function(operations) {
  const stack = [];
  for (const op of operations) {
    if (op === '+') {
      stack.push(stack[stack.length - 1] + stack[stack.length - 2]);
    } else if (op === 'D') {
      stack.push(stack[stack.length - 1] * 2);
    } else if (op === 'C') {
      stack.pop();
    } else {
      stack.push(Number(op));
    }
  }
  return stack.reduce((acc, cur) => acc + cur, 0);
};

var solve = calPoints;

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
