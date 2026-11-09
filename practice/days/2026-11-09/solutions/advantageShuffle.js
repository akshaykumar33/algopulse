var advantageCount = function(nums1, nums2) {
  const n = nums1.length;
  nums1.sort((a, b) => a - b);
  const idx = new Int32Array(n);
  for (let i = 0; i < n; i++) idx[i] = i;
  idx.sort((a, b) => nums2[b] - nums2[a]);
  const ans = new Int32Array(n);
  let left = 0, right = n - 1;
  for (let i = 0; i < n; i++) {
    const j = idx[i];
    if (nums1[right] > nums2[j]) {
      ans[j] = nums1[right--];
    } else {
      ans[j] = nums1[left++];
    }
  }
  return Array.from(ans);
};

var solve = advantageCount;

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
