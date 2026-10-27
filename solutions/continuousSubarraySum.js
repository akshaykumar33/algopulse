var continuousSubarraySum = function(nums, k) { 
    const map = new Map();
    map.set(0, -1);
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (k !== 0) {
            sum %= k;
        }
        if (map.has(sum)) {
            if (i - map.get(sum) > 1) {
                return true;
            }
        } else {
            map.set(sum, i);
        }
    }
    return false;
};

var solve = typeof continuousSubarraySum !== 'undefined' ? continuousSubarraySum : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const nums = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i+1]);
        console.log(JSON.stringify(solve(nums, k)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
