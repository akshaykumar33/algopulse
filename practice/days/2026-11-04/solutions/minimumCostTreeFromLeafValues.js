var mctFromLeafValues = function(arr) {
  const stack = [Infinity];
  let ans = 0;
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i];
    while (stack[stack.length - 1] <= a) {
      const mid = stack.pop();
      ans += mid * Math.min(stack[stack.length - 1], a);
    }
    stack.push(a);
  }
  while (stack.length > 2) {
    ans += stack.pop() * stack[stack.length - 1];
  }
  return ans;
};

var minimumCostTreeFromLeafValues = mctFromLeafValues;
var solve = typeof minimumCostTreeFromLeafValues !== 'undefined' ? minimumCostTreeFromLeafValues : null;

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
