var partitionArray = function(nums, k) {
  nums.sort((a, b) => a - b);
  let ans = 1;
  let minVal = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - minVal > k) {
      ans++;
      minVal = nums[i];
    }
  }
  return ans;
};

var solve = partitionArray;

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
