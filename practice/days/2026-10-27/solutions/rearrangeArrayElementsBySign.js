var rearrangeArray = function(nums) {
    const res = new Array(nums.length);
    let pos = 0;
    let neg = 1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            res[pos] = nums[i];
            pos += 2;
        } else {
            res[neg] = nums[i];
            neg += 2;
        }
    }
    return res;
};
var solve = rearrangeArray;

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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
