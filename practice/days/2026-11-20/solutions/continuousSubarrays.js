var continuousSubarrays = function(nums) {
  let ans = 0;
  let left = 0;
  const minDeque = [];
  const maxDeque = [];

  for (let right = 0; right < nums.length; right++) {
    const x = nums[right];
    while (minDeque.length > 0 && nums[minDeque[minDeque.length - 1]] >= x) minDeque.pop();
    minDeque.push(right);

    while (maxDeque.length > 0 && nums[maxDeque[maxDeque.length - 1]] <= x) maxDeque.pop();
    maxDeque.push(right);

    while (nums[maxDeque[0]] - nums[minDeque[0]] > 2) {
      left++;
      if (minDeque[0] < left) minDeque.shift();
      if (maxDeque[0] < left) maxDeque.shift();
    }

    ans += right - left + 1;
  }

  return ans;
};

var solve = continuousSubarrays;

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

module.exports = continuousSubarrays;