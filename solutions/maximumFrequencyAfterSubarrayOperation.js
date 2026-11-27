var maxFrequency = function(nums, k) {
  let countK = 0;
  for (const x of nums) if (x === k) countK++;
  let maxGain = 0;
  const values = new Set(nums);
  values.delete(k);
  for (const v of values) {
    let cur = 0, best = 0;
    for (const x of nums) {
      if (x === v) cur++;
      else if (x === k) cur--;
      if (cur < 0) cur = 0;
      if (cur > best) best = cur;
    }
    if (best > maxGain) maxGain = best;
  }
  return countK + maxGain;
};
var solve = maxFrequency;
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
module.exports = maxFrequency;
