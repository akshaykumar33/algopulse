var longestNiceSubarray = function(nums) {
  let mask = 0;
  let left = 0;
  let ans = 0;
  for (let right = 0; right < nums.length; right++) {
    const v = nums[right];
    while ((mask & v) !== 0) {
      mask ^= nums[left++];
    }
    mask |= v;
    const len = right - left + 1;
    if (len > ans) ans = len;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (const line of lines) {
      console.log(JSON.stringify(longestNiceSubarray(JSON.parse(line))));
    }
  }
}

module.exports = longestNiceSubarray;
