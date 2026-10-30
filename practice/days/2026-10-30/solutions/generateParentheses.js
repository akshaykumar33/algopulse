var generateParenthesis = function(n) {
  const res = [];
  function backtrack(open, close, cur) {
    if (cur.length === 2 * n) {
      res.push(cur);
      return;
    }
    if (open < n) {
      backtrack(open + 1, close, cur + '(');
    }
    if (close < open) {
      backtrack(open, close + 1, cur + ')');
    }
  }
  backtrack(0, 0, "");
  return res;
};

var solve = function(n) {
  return generateParenthesis(n);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
