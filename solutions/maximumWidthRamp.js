var maxWidthRamp = function(nums) {
  const n = nums.length;
  const stack = [];
  for (let i = 0; i < n; i++) {
    if (stack.length === 0 || nums[i] < nums[stack[stack.length - 1]]) {
      stack.push(i);
    }
  }

  let maxW = 0;
  for (let j = n - 1; j >= 0; j--) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[j]) {
      const i = stack.pop();
      if (j - i > maxW) maxW = j - i;
    }
  }
  return maxW;
};

var solve = maxWidthRamp;

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
