var numTimesAllBlue = function(flips) {
  let maxFlip = 0;
  let ans = 0;
  for (let i = 0; i < flips.length; i++) {
    if (flips[i] > maxFlip) maxFlip = flips[i];
    if (maxFlip === i + 1) ans++;
  }
  return ans;
};

var numberOfTimesBinaryStringIsPrefixAligned = numTimesAllBlue;
var solve = typeof numberOfTimesBinaryStringIsPrefixAligned !== 'undefined' ? numberOfTimesBinaryStringIsPrefixAligned : null;

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
