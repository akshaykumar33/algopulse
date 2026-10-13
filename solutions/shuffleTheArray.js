var solve = function(nums, n) {
  let res = new Array(2 * n);
  for (let i = 0; i < n; i++) {
    res[2 * i] = nums[i];
    res[2 * i + 1] = nums[i + n];
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        try {
          const nums = JSON.parse(lines[i]);
          const n = JSON.parse(lines[i + 1]);
          const result = solve(nums, n);
          console.log(JSON.stringify(result));
        } catch (e) {}
      }
    }
  } catch (err) {}
}
module.exports = solve;
