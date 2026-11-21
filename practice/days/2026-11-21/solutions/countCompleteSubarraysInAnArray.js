var countCompleteSubarrays = function(nums) {
  const target = new Set(nums).size;
  let ans = 0, l = 0;
  const count = new Map();
  for (let r = 0; r < nums.length; r++) {
    count.set(nums[r], (count.get(nums[r]) || 0) + 1);
    while (count.size === target) {
      ans += nums.length - r;
      const c = count.get(nums[l]) - 1;
      if (c === 0) count.delete(nums[l]);
      else count.set(nums[l], c);
      l++;
    }
  }
  return ans;
};

var solve = countCompleteSubarrays;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = countCompleteSubarrays;