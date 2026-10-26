var maximumUniqueSubarray = function(nums) {
  let l = 0, cur = 0, max = 0;
  const seen = new Set();
  for (let r = 0; r < nums.length; r++) {
    while (seen.has(nums[r])) {
      seen.delete(nums[l]);
      cur -= nums[l];
      l++;
    }
    seen.add(nums[r]);
    cur += nums[r];
    if (cur > max) max = cur;
  }
  return max;
};

var maximumErasureValue = function(nums) {
  return maximumUniqueSubarray(nums);
};

var solve = maximumErasureValue;

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

var solve = typeof maximumErasureValue !== 'undefined' ? maximumErasureValue : null;
