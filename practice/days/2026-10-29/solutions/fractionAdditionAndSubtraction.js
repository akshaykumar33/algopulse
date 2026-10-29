var fractionAddition = function(expression) {
  function gcd(a, b) {
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  let num = 0;
  let den = 1;

  let i = 0;
  const n = expression.length;
  while (i < n) {
    let sign = 1;
    if (expression[i] === '+' || expression[i] === '-') {
      if (expression[i] === '-') sign = -1;
      i++;
    }

    let curNum = 0;
    while (i < n && expression[i] !== '/') {
      curNum = curNum * 10 + (expression.charCodeAt(i) - 48);
      i++;
    }
    curNum *= sign;
    i++; // skip '/'

    let curDen = 0;
    while (i < n && expression[i] !== '+' && expression[i] !== '-') {
      curDen = curDen * 10 + (expression.charCodeAt(i) - 48);
      i++;
    }

    num = num * curDen + curNum * den;
    den = den * curDen;
    const g = Math.abs(gcd(num, den));
    num = Math.floor(num / g);
    den = Math.floor(den / g);
  }

  return num + '/' + den;
};

var solve = typeof fractionAddition !== 'undefined' ? fractionAddition : null;

// ---------------- LOCAL TEST HARNESS ----------------
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
