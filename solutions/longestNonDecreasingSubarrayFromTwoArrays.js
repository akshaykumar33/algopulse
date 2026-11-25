var maxNonDecreasingLength = function(nums1, nums2) {
  const n = nums1.length;
  let dp1 = 1;
  let dp2 = 1;
  let ans = 1;
  for (let i = 1; i < n; i++) {
    let ndp1 = 1;
    let ndp2 = 1;
    if (nums1[i] >= nums1[i - 1]) ndp1 = Math.max(ndp1, dp1 + 1);
    if (nums1[i] >= nums2[i - 1]) ndp1 = Math.max(ndp1, dp2 + 1);
    if (nums2[i] >= nums1[i - 1]) ndp2 = Math.max(ndp2, dp1 + 1);
    if (nums2[i] >= nums2[i - 1]) ndp2 = Math.max(ndp2, dp2 + 1);
    dp1 = ndp1;
    dp2 = ndp2;
    if (dp1 > ans) ans = dp1;
    if (dp2 > ans) ans = dp2;
  }
  return ans;
};

var solve = maxNonDecreasingLength;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i + 1 < lines.length; i += 2) {
      const nums1 = JSON.parse(lines[i]);
      const nums2 = JSON.parse(lines[i + 1]);
      out.push(JSON.stringify(maxNonDecreasingLength(nums1, nums2)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = maxNonDecreasingLength;
