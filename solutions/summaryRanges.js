var summaryRanges = function(nums) {
  const res = [];
  let i = 0;
  while (i < nums.length) {
    let start = nums[i];
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
      i++;
    }
    if (start === nums[i]) {
      res.push("" + start);
    } else {
      res.push(start + "->" + nums[i]);
    }
    i++;
  }
  return res;
};
var solve = summaryRanges;

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
