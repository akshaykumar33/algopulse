var goodIndices = function(nums, k) {
  const n = nums.length;
  const left = new Int32Array(n);
  const right = new Int32Array(n);
  left[0] = 1;
  for (let i = 1; i < n; i++) {
    left[i] = nums[i] <= nums[i - 1] ? left[i - 1] + 1 : 1;
  }
  right[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    right[i] = nums[i] <= nums[i + 1] ? right[i + 1] + 1 : 1;
  }

  const ans = [];
  for (let i = k; i < n - k; i++) {
    if (left[i - 1] >= k && right[i + 1] >= k) {
      ans.push(i);
    }
  }
  return ans;
};

var solve = goodIndices;

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
