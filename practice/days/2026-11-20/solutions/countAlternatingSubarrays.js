var countAlternatingSubarrays = function(nums) {
  let ans = 0, cur = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] !== nums[i - 1]) cur++;
    else cur = 1;
    ans += cur;
  }
  return ans;
};

var solve = countAlternatingSubarrays;

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

module.exports = countAlternatingSubarrays;