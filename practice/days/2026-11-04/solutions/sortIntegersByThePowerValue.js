const memo = new Map();

function getPower(x) {
  if (x === 1) return 0;
  if (memo.has(x)) return memo.get(x);
  let steps;
  if (x % 2 === 0) steps = 1 + getPower(x / 2);
  else steps = 1 + getPower(3 * x + 1);
  memo.set(x, steps);
  return steps;
}

var getKth = function(lo, hi, k) {
  const arr = [];
  for (let i = lo; i <= hi; i++) {
    arr.push(i);
  }
  arr.sort((a, b) => {
    const pa = getPower(a);
    const pb = getPower(b);
    return pa === pb ? a - b : pa - pb;
  });
  return arr[k - 1];
};

var sortIntegersByThePowerValue = getKth;
var solve = typeof sortIntegersByThePowerValue !== 'undefined' ? sortIntegersByThePowerValue : null;

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

