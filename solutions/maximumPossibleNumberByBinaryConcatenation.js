var maxGoodNumber = function(nums) {
  const bin = nums.map(x => x.toString(2));
  const perms = [
    [0, 1, 2], [0, 2, 1],
    [1, 0, 2], [1, 2, 0],
    [2, 0, 1], [2, 1, 0]
  ];
  let maxVal = 0;
  for (const [a, b, c] of perms) {
    const s = bin[a] + bin[b] + bin[c];
    const val = parseInt(s, 2);
    if (val > maxVal) maxVal = val;
  }
  return maxVal;
};
var solve = maxGoodNumber;
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
module.exports = maxGoodNumber;
