var minSpaceWastedKResizing = function(nums, k) {
  const n = nums.length;
  let dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;
  let ans = Infinity;
  for (let s = 0; s <= k; s++) {
    const nd = new Array(n + 1).fill(Infinity);
    for (let i = 0; i < n; i++) {
      if (dp[i] === Infinity) continue;
      let mx = 0, sum = 0;
      for (let j = i; j < n; j++) {
        if (nums[j] > mx) mx = nums[j];
        sum += nums[j];
        const v = dp[i] + mx * (j - i + 1) - sum;
        if (v < nd[j + 1]) nd[j + 1] = v;
      }
    }
    dp = nd;
    if (dp[n] < ans) ans = dp[n];
  }
  return ans;
};
var solve = minSpaceWastedKResizing;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = minSpaceWastedKResizing;
