var solve = function(nums1, nums2) {
    const s1 = new Set(nums1);
    const s2 = new Set(nums2);
    const r1 = [];
    const r2 = [];
    for (const x of s1) {
        if (!s2.has(x)) {
            r1.push(x);
        }
    }
    for (const x of s2) {
        if (!s1.has(x)) {
            r2.push(x);
        }
    }
    return [r1, r2];
};

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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
