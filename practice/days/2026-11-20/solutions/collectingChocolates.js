var minCost = function(nums, x) {
  const n = nums.length;
  const minVal = new Int32Array(nums);
  let ans = 0;
  for (let i = 0; i < n; i++) ans += nums[i];

  for (let k = 1; k < n; k++) {
    let curCost = k * x;
    for (let i = 0; i < n; i++) {
      const rotated = nums[(i - k + n) % n];
      if (rotated < minVal[i]) minVal[i] = rotated;
      curCost += minVal[i];
    }
    if (curCost < ans) ans = curCost;
  }

  return ans;
};

var solve = minCost;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = minCost;