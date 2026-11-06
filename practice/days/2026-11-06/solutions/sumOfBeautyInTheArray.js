var sumOfBeauties = function(nums) {
  const n = nums.length;
  const prefMax = new Int32Array(n);
  const suffMin = new Int32Array(n);

  prefMax[0] = nums[0];
  for (let i = 1; i < n; i++) {
    prefMax[i] = nums[i] > prefMax[i - 1] ? nums[i] : prefMax[i - 1];
  }

  suffMin[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    suffMin[i] = nums[i] < suffMin[i + 1] ? nums[i] : suffMin[i + 1];
  }

  let ans = 0;
  for (let i = 1; i <= n - 2; i++) {
    if (prefMax[i - 1] < nums[i] && nums[i] < suffMin[i + 1]) {
      ans += 2;
    } else if (nums[i - 1] < nums[i] && nums[i] < nums[i + 1]) {
      ans += 1;
    }
  }

  return ans;
};

var solve = typeof sumOfBeauties !== 'undefined' ? sumOfBeauties : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const nums = JSON.parse(lines[i]);
        console.log(JSON.stringify(solve(nums)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

