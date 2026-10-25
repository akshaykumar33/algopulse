var maximumSum = function(nums) {
  const maxVal = new Int32Array(82);
  let ans = -1;

  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    let tmp = x;
    let s = 0;
    while (tmp > 0) {
      s += tmp % 10;
      tmp = Math.floor(tmp / 10);
    }

    if (maxVal[s] > 0) {
      const sum = maxVal[s] + x;
      if (sum > ans) ans = sum;
      if (x > maxVal[s]) maxVal[s] = x;
    } else {
      maxVal[s] = x;
    }
  }

  return ans;
};

var solve = maximumSum;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const nums = JSON.parse(lines[i]);
        const result = solve(nums);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = maximumSum;
