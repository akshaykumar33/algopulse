var subArrayRanges = function(nums) {
  const n = nums.length;
  let ans = 0;

  const minLeft = new Int32Array(n);
  const minRight = new Int32Array(n);
  const maxLeft = new Int32Array(n);
  const maxRight = new Int32Array(n);

  let stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
      stack.pop();
    }
    minLeft[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
    stack.push(i);
  }

  stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] > nums[i]) {
      stack.pop();
    }
    minRight[i] = stack.length === 0 ? n : stack[stack.length - 1];
    stack.push(i);
  }

  stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop();
    }
    maxLeft[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
    stack.push(i);
  }

  stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      stack.pop();
    }
    maxRight[i] = stack.length === 0 ? n : stack[stack.length - 1];
    stack.push(i);
  }

  for (let i = 0; i < n; i++) {
    const maxCount = (i - maxLeft[i]) * (maxRight[i] - i);
    const minCount = (i - minLeft[i]) * (minRight[i] - i);
    ans += nums[i] * (maxCount - minCount);
  }

  return ans;
};

var solve = subArrayRanges;

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
  } catch (err) {}
}

module.exports = solve;
