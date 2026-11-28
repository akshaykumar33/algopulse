var minSum = function(nums1, nums2) {
  let s1 = 0, s2 = 0, z1 = 0, z2 = 0;
  for (const x of nums1) { s1 += x; if (!x) z1++; }
  for (const x of nums2) { s2 += x; if (!x) z2++; }
  const a = s1 + z1, b = s2 + z2;
  if ((z1 === 0 && a < b) || (z2 === 0 && b < a)) return -1;
  return Math.max(a, b);
};
var solve = minSum;
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
module.exports = minSum;
