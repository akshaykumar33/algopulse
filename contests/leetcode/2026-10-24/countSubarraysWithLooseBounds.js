var countSubarrays = function(nums, minK, maxK) {
  if (minK > maxK) return 0;
  let ans = 0;
  let len = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= minK && nums[i] <= maxK) {
      len++;
      ans += len;
    } else {
      len = 0;
    }
  }
  return ans;
};

var solve = countSubarrays;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 3) {
        const nums = JSON.parse(lines[i]);
        const minK = JSON.parse(lines[i + 1]);
        const maxK = JSON.parse(lines[i + 2]);
        console.log(JSON.stringify(solve(nums, minK, maxK)));
      }
    }
  } catch (err) {}
}

module.exports = solve;
