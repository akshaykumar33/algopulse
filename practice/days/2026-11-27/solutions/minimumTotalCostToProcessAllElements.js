var minimumCost = function(nums, k) {
  let pre = 0, q = 0;
  for (const x of nums) {
    pre += x;
    if (pre > k) q = Math.max(q, Math.ceil((pre - k) / k));
  }
  const Q = BigInt(q);
  return Number(Q * (Q + 1n) / 2n % 1000000007n);
};
var solve = minimumCost;
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
module.exports = minimumCost;
