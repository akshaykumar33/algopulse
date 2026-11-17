var numSubarraysWithSum = function(nums, goal) {
  const freq = new Int32Array(nums.length + 1);
  freq[0] = 1;
  let sum = 0;
  let ans = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (sum >= goal) {
      ans += freq[sum - goal];
    }
    freq[sum]++;
  }

  return ans;
};

var solve = numSubarraysWithSum;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
