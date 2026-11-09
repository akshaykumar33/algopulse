var xorAllNums = function(nums1, nums2) {
  let ans = 0;
  if (nums2.length % 2 === 1) {
    for (let i = 0; i < nums1.length; i++) ans ^= nums1[i];
  }
  if (nums1.length % 2 === 1) {
    for (let i = 0; i < nums2.length; i++) ans ^= nums2[i];
  }
  return ans;
};

var solve = xorAllNums;

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
