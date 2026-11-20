var getSubarrayBeauty = function(nums, k, x) {
  const n = nums.length;
  const count = new Int32Array(51);
  const ans = new Int32Array(n - k + 1);

  for (let i = 0; i < k; i++) {
    if (nums[i] < 0) count[-nums[i]]++;
  }

  function getXth() {
    let seen = 0;
    for (let v = 50; v >= 1; v--) {
      seen += count[v];
      if (seen >= x) return -v;
    }
    return 0;
  }

  ans[0] = getXth();

  for (let i = k; i < n; i++) {
    if (nums[i] < 0) count[-nums[i]]++;
    if (nums[i - k] < 0) count[-nums[i - k]]--;
    ans[i - k + 1] = getXth();
  }

  return Array.from(ans);
};

var solve = getSubarrayBeauty;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2])));
    }
  } catch (e) {}
}

module.exports = getSubarrayBeauty;