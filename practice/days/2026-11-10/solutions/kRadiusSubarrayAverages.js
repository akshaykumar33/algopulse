var getAverages = function(nums, k) {
  const n = nums.length;
  const ans = new Array(n).fill(-1);
  const size = 2 * k + 1;
  if (size > n) return ans;
  let sum = 0;
  for (let i = 0; i < size; i++) {
    sum += nums[i];
  }
  ans[k] = Math.floor(sum / size);
  for (let i = k + 1; i < n - k; i++) {
    sum += nums[i + k] - nums[i - k - 1];
    ans[i] = Math.floor(sum / size);
  }
  return ans;
};

var solve = getAverages;

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
