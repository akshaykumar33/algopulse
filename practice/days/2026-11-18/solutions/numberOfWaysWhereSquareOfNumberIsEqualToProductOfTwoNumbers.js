var numTriplets = function(nums1, nums2) {
  function countPairs(a, b) {
    const prodMap = new Map();
    for (let j = 0; j < b.length; j++) {
      for (let k = j + 1; k < b.length; k++) {
        const p = b[j] * b[k];
        prodMap.set(p, (prodMap.get(p) || 0) + 1);
      }
    }
    let total = 0;
    for (let i = 0; i < a.length; i++) {
      const sq = a[i] * a[i];
      total += prodMap.get(sq) || 0;
    }
    return total;
  }

  return countPairs(nums1, nums2) + countPairs(nums2, nums1);
};

var solve = numTriplets;

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

module.exports = numTriplets;
