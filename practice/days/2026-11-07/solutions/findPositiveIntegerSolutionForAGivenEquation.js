var findSolution = function(customfunction, z) {
  const ans = [];
  let x = 1, y = 1000;
  while (x <= 1000 && y >= 1) {
    const val = typeof customfunction === 'function' ? customfunction(x, y) : customfunction.f(x, y);
    if (val === z) {
      ans.push([x, y]);
      x++;
      y--;
    } else if (val < z) {
      x++;
    } else {
      y--;
    }
  }
  return ans;
};

var solve = function(id, z) {
  let fn = (x, y) => x + y;
  if (id === 2) fn = (x, y) => x * y;
  return findSolution({ f: fn }, z);
};

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
  } catch (err) {}
}
module.exports = { findSolution, solve };
