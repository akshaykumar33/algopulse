var reinitializePermutation = function(n) {
  let step = 0;
  let pos = 1;
  do {
    if (pos < n / 2) {
      pos = 2 * pos;
    } else {
      pos = 2 * pos - (n - 1);
    }
    step++;
  } while (pos !== 1);
  return step;
};

var solve = reinitializePermutation;

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

module.exports = solve;
