var fourSumCount = function(nums1, nums2, nums3, nums4) {
    const map = new Map();
    for (const a of nums1) {
        for (const b of nums2) {
            const sum = a + b;
            map.set(sum, (map.get(sum) || 0) + 1);
        }
    }
    let ans = 0;
    for (const c of nums3) {
        for (const d of nums4) {
            const target = -(c + d);
            if (map.has(target)) {
                ans += map.get(target);
            }
        }
    }
    return ans;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 4) {
        const nums1 = JSON.parse(lines[i]);
        const nums2 = JSON.parse(lines[i+1]);
        const nums3 = JSON.parse(lines[i+2]);
        const nums4 = JSON.parse(lines[i+3]);
        const result = fourSumCount(nums1, nums2, nums3, nums4);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = fourSumCount;
