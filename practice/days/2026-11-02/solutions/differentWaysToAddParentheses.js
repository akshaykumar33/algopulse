var diffWaysToCompute = function(expression) {
  const memo = new Map();
  function helper(expr) {
    if (memo.has(expr)) return memo.get(expr);
    const res = [];
    for (let i = 0; i < expr.length; i++) {
      const c = expr[i];
      if (c === '+' || c === '-' || c === '*') {
        const left = helper(expr.slice(0, i));
        const right = helper(expr.slice(i + 1));
        for (const l of left) {
          for (const r of right) {
            if (c === '+') res.push(l + r);
            else if (c === '-') res.push(l - r);
            else if (c === '*') res.push(l * r);
          }
        }
      }
    }
    if (res.length === 0) {
      res.push(parseInt(expr, 10));
    }
    memo.set(expr, res);
    return res;
  }
  return helper(expression).sort((a, b) => a - b);
};

var solve = typeof diffWaysToCompute !== 'undefined' ? diffWaysToCompute : null;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      console.log(JSON.stringify(diffWaysToCompute(parsed)));
    }
  }
}

