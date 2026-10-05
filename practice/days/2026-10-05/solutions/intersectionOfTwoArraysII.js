var solve = function(nums1, nums2) {
  const map = new Map();
  for (const x of nums1) {
    map.set(x, (map.get(x) || 0) + 1);
  }
  const ans = [];
  for (const x of nums2) {
    if (map.has(x) && map.get(x) > 0) {
      ans.push(x);
      map.set(x, map.get(x) - 1);
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
      for (let i = 0; i < lines.length; i += 2) {
        try {
          const nums1 = JSON.parse(lines[i]);
          const nums2 = JSON.parse(lines[i + 1]);
          const result = solve(nums1, nums2);
          console.log(JSON.stringify(result));
        } catch {}
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
