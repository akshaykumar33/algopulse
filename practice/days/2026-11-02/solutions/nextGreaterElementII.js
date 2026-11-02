var nextGreaterElementII = function(nums) {
    const n = nums.length;
    const res = new Array(n).fill(-1);
    const stack = [];

    for (let i = 0; i < 2 * n; i++) {
        const currentNum = nums[i % n];
        while (stack.length > 0 && nums[stack[stack.length - 1]] < currentNum) {
            res[stack.pop()] = currentNum;
        }
        if (i < n) {
            stack.push(i);
        }
    }

    return res;
};


if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const solve = typeof nextGreaterElementII !== 'undefined' ? nextGreaterElementII : null;
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          const solve = typeof nextGreaterElementII !== 'undefined' ? nextGreaterElementII : null;
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = nextGreaterElementII;
