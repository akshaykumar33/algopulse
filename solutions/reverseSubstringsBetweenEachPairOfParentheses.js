var reverseParentheses = function(s) {
  const n = s.length;
  const pair = new Int32Array(n);
  const stack = [];
  for (let i = 0; i < n; i++) {
    if (s[i] === '(') {
      stack.push(i);
    } else if (s[i] === ')') {
      const j = stack.pop();
      pair[i] = j;
      pair[j] = i;
    }
  }

  const res = [];
  let i = 0;
  let d = 1;
  while (i < n) {
    if (s[i] === '(' || s[i] === ')') {
      i = pair[i];
      d = -d;
    } else {
      res.push(s[i]);
    }
    i += d;
  }

  return res.join('');
};

var reverseSubstringsBetweenEachPairOfParentheses = reverseParentheses;
var solve = typeof reverseSubstringsBetweenEachPairOfParentheses !== 'undefined' ? reverseSubstringsBetweenEachPairOfParentheses : null;

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
