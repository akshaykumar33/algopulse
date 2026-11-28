var uniformArray = function(nums1) {
  let mnOdd = Infinity, mnEven = Infinity;
  for (const x of nums1) {
    if (x & 1) { if (x < mnOdd) mnOdd = x; }
    else if (x < mnEven) mnEven = x;
  }
  return mnOdd === Infinity || mnOdd < mnEven;
};
var solve = uniformArray;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = uniformArray;
