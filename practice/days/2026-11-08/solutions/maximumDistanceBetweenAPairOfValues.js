var maxDistance = function(nums1, nums2) {
  let ans = 0;
  let i = 0, j = 0;
  const n = nums1.length, m = nums2.length;
  while (i < n && j < m) {
    if (j < i) {
      j = i;
      continue;
    }
    if (nums1[i] <= nums2[j]) {
      ans = Math.max(ans, j - i);
      j++;
    } else {
      i++;
    }
  }
  return ans;
};

var solve = maxDistance;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = solve;
