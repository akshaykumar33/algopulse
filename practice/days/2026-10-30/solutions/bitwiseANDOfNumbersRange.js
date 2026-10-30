var rangeBitwiseAnd = function(left, right) {
  let shift = 0;
  while (left < right) {
    left >>= 1;
    right >>= 1;
    shift++;
  }
  return left << shift;
};

var solve = function(left, right) {
  return rangeBitwiseAnd(left, right);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      const left = JSON.parse(lines[0]);
      const right = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(left, right)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
