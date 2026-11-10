var largestCombination = function(candidates) {
  let maxCount = 0;
  for (let b = 0; b < 25; b++) {
    const mask = 1 << b;
    let count = 0;
    for (let i = 0; i < candidates.length; i++) {
      if ((candidates[i] & mask) !== 0) {
        count++;
      }
    }
    if (count > maxCount) {
      maxCount = count;
    }
  }
  return maxCount;
};

var solve = largestCombination;

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
