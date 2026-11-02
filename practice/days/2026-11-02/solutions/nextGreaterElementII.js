var nextGreaterElements = function(nums) {
    const n = nums.length;
    const res = new Array(n).fill(-1);
    const stack = [];
    for (let i = 0; i < 2 * n; i++) {
        const cur = nums[i % n];
        while (stack.length > 0 && nums[stack[stack.length - 1]] < cur) {
            res[stack.pop()] = cur;
        }
        if (i < n) {
            stack.push(i);
        }
    }
    return res;
};

var nextGreaterElementII = nextGreaterElements;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = nextGreaterElements(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(nextGreaterElements(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = nextGreaterElements;
