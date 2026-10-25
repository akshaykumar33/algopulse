var maxSubarrayLength = function(nums, k) {
  let left = 0;
  let maxLen = 0;
  const freq = new Map();

  for (let right = 0; right < nums.length; right++) {
    const v = nums[right];
    freq.set(v, (freq.get(v) || 0) + 1);

    while (freq.get(v) > k) {
      const lv = nums[left];
      freq.set(lv, freq.get(lv) - 1);
      left++;
    }

    if (right - left + 1 > maxLen) {
      maxLen = right - left + 1;
    }
  }

  return maxLen;
};

var solve = maxSubarrayLength;

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

module.exports = maxSubarrayLength;
