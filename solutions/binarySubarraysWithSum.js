var solve = function(nums, goal) {
  const atMost = (k) => {
    if (k < 0) return 0;
    let res = 0, l = 0, sum = 0;
    for (let r = 0; r < nums.length; r++) {
      sum += nums[r];
      while (sum > k) {
        sum -= nums[l++];
      }
      res += r - l + 1;
    }
    return res;
  };
  return atMost(goal) - atMost(goal - 1);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const nums = JSON.parse(lines[i]);
        const goal = JSON.parse(lines[i + 1]);
        const result = solve(nums, goal);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
