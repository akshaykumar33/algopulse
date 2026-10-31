var topKFrequent = function(nums, k) {
    let freq = new Map();
    for (let x of nums) {
        freq.set(x, (freq.get(x) || 0) + 1);
    }
    let buckets = Array.from({ length: nums.length + 1 }, () => []);
    for (let [num, count] of freq.entries()) {
        buckets[count].push(num);
    }
    let res = [];
    for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
        if (buckets[i].length > 0) {
            res.push(...buckets[i]);
        }
    }
    return res.slice(0, k);
};
var solve = topKFrequent;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const nums = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        const result = solve(nums, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
