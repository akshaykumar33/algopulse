var increasingTriplet = function(nums) {
  let first = Infinity;
  let second = Infinity;
  for (let x of nums) {
    if (x <= first) {
      first = x;
    } else if (x <= second) {
      second = x;
    } else {
      return true;
    }
  }
  return false;
};
var solve = typeof increasingTriplet !== 'undefined' ? increasingTriplet : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const arg = JSON.parse(line);
        const result = solve(arg);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
