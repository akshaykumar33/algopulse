var findMissingAndRepeatedValues = function(grid) {
  const n = grid.length;
  const total = n * n;
  const freq = new Int32Array(total + 1);
  let repeated = 0;
  let missing = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      freq[grid[i][j]]++;
    }
  }
  for (let i = 1; i <= total; i++) {
    if (freq[i] === 2) repeated = i;
    if (freq[i] === 0) missing = i;
  }
  return [repeated, missing];
};

var solve = findMissingAndRepeatedValues;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    process.exit(0);
  }
}
module.exports = solve;
