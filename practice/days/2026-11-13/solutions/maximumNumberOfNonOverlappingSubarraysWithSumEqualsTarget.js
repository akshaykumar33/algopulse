var maxNonOverlapping = function(nums, target) {
  let ans = 0;
  let pref = 0;
  let seen = new Set([0]);
  for (let i = 0; i < nums.length; i++) {
    pref += nums[i];
    if (seen.has(pref - target)) {
      ans++;
      seen = new Set([0]);
      pref = 0;
    } else {
      seen.add(pref);
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      try {
        const p = JSON.parse(l);
        return Array.isArray(p) && p.length === 2 && Array.isArray(p[0]) && typeof p[1] === 'number';
      } catch (_) {
        return false;
      }
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(maxNonOverlapping(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const args = lines.slice(i, i + 2).map((l) => JSON.parse(l));
        console.log(JSON.stringify(maxNonOverlapping(...args)));
      }
    }
  }
}

module.exports = maxNonOverlapping;
