var maximumEvenSplit = function(finalSum) {
  if (finalSum % 2 !== 0) return [];
  const ans = [];
  let cur = 2;
  let rem = finalSum;
  while (rem - cur >= cur + 2) {
    ans.push(cur);
    rem -= cur;
    cur += 2;
  }
  ans.push(rem);
  return ans;
};

var solve = maximumEvenSplit;

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
