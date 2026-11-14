var totalSteps = function(nums) {
  const stack = [];
  let maxSteps = 0;

  for (let i = nums.length - 1; i >= 0; i--) {
    let cur = 0;
    while (stack.length > 0 && nums[i] > stack[stack.length - 1].val) {
      cur = Math.max(cur + 1, stack[stack.length - 1].steps);
      stack.pop();
    }
    if (cur > maxSteps) maxSteps = cur;
    stack.push({ val: nums[i], steps: cur });
  }

  return maxSteps;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(totalSteps(JSON.parse(l))));
  }
}

module.exports = totalSteps;
