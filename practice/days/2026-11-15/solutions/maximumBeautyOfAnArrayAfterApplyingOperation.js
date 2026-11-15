var maximumBeauty = function(nums, k) {
  nums.sort((a, b) => a - b);
  let l = 0;
  let ans = 0;
  const target = 2 * k;
  for (let r = 0; r < nums.length; r++) {
    while (nums[r] - nums[l] > target) l++;
    const len = r - l + 1;
    if (len > ans) ans = len;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(maximumBeauty(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = maximumBeauty;
