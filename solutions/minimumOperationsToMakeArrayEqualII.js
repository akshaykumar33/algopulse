var minOperations = function(nums1, nums2, k) {
  const n = nums1.length;
  if (k === 0) {
    for (let i = 0; i < n; i++) {
      if (nums1[i] !== nums2[i]) return -1;
    }
    return 0;
  }

  let pos = 0;
  let neg = 0;

  for (let i = 0; i < n; i++) {
    const diff = nums1[i] - nums2[i];
    if (diff % k !== 0) return -1;
    const steps = diff / k;
    if (steps > 0) pos += steps;
    else if (steps < 0) neg -= steps;
  }

  return pos === neg ? pos : -1;
};

var solve = minOperations;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = minOperations;
