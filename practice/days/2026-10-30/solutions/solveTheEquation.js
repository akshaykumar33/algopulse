var solveEquation = function(equation) {
  const [leftStr, rightStr] = equation.split('=');
  function parse(s) {
    let xCoeff = 0;
    let constTerm = 0;
    let i = 0;
    while (i < s.length) {
      let sign = 1;
      if (s[i] === '+') {
        i++;
      } else if (s[i] === '-') {
        sign = -1;
        i++;
      }
      let start = i;
      while (i < s.length && s[i] >= '0' && s[i] <= '9') {
        i++;
      }
      const numStr = s.slice(start, i);
      if (i < s.length && s[i] === 'x') {
        const val = numStr === "" ? 1 : parseInt(numStr, 10);
        xCoeff += sign * val;
        i++;
      } else {
        const val = parseInt(numStr, 10);
        constTerm += sign * val;
      }
    }
    return [xCoeff, constTerm];
  }

  const [lx, lc] = parse(leftStr);
  const [rx, rc] = parse(rightStr);

  const totalX = lx - rx;
  const totalC = rc - lc;

  if (totalX === 0) {
    if (totalC === 0) return "Infinite solutions";
    return "No solution";
  }

  return "x=" + (totalC / totalX);
};

var solve = function(equation) {
  return solveEquation(equation);
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
