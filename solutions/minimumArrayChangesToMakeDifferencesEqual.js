var minChanges = function(nums, k) {
  const n = nums.length;
  const m = n >> 1;
  const diffCount = new Int32Array(k + 1);
  const maxDiffCount = new Int32Array(k + 1);

  for (let i = 0; i < m; i++) {
    const a = nums[i], b = nums[n - 1 - i];
    const diff = Math.abs(a - b);
    diffCount[diff]++;
    const maxD = Math.max(k - a, a, k - b, b);
    maxDiffCount[maxD]++;
  }

  const prefMaxDiff = new Int32Array(k + 2);
  for (let x = 0; x <= k; x++) {
    prefMaxDiff[x + 1] = prefMaxDiff[x] + maxDiffCount[x];
  }

  let ans = 1e9;
  for (let x = 0; x <= k; x++) {
    const cost2 = x > 0 ? prefMaxDiff[x] : 0;
    const cost1 = (m - cost2) - diffCount[x];
    const total = cost1 + 2 * cost2;
    if (total < ans) ans = total;
  }

  return ans;
};

var solve = minChanges;

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

module.exports = minChanges;