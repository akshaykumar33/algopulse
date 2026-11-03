var maximumLengthOfRepeatedSubarray = function(nums1, nums2) {
    const n = nums1.length;
    const m = nums2.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    let ans = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (nums1[i - 1] === nums2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if (dp[i][j] > ans) {
                    ans = dp[i][j];
                }
            }
        }
    }
    return ans;
};
var solve = typeof maximumLengthOfRepeatedSubarray !== 'undefined' ? maximumLengthOfRepeatedSubarray : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const nums1 = JSON.parse(lines[i]);
        const nums2 = JSON.parse(lines[i + 1]);
        const result = solve(nums1, nums2);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
