var kDiffPairsInAnArray = function(nums, k) {
    if (k < 0) return 0;
    const freq = new Map();
    for (const x of nums) {
        freq.set(x, (freq.get(x) || 0) + 1);
    }
    let ans = 0;
    for (const [x, c] of freq.entries()) {
        if (k === 0) {
            if (c > 1) ans++;
        } else {
            if (freq.has(x + k)) ans++;
        }
    }
    return ans;
};
var solve = typeof kDiffPairsInAnArray !== 'undefined' ? kDiffPairsInAnArray : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const nums = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(nums, k)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
