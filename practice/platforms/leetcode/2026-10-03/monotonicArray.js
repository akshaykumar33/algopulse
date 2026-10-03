var isMonotonic = function(nums) {
  let inc = true;
  let dec = true;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) inc = false;
    if (nums[i] < nums[i + 1]) dec = false;
  }
  return inc || dec;
};

var solve = isMonotonic;

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
    process.exit(0);
  }
}
module.exports = solve;
