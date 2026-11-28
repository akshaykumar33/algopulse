var canSortArray = function(nums) {
  const bits = x => { let c = 0; while (x) { c += x & 1; x >>= 1; } return c; };
  let prevMax = -Infinity, curMax = -Infinity, cb = -1;
  for (const x of nums) {
    const b = bits(x);
    if (b !== cb) { prevMax = curMax; cb = b; }
    if (x < prevMax) return false;
    curMax = Math.max(curMax, x);
  }
  return true;
};
var solve = canSortArray;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = canSortArray;
