var largestDivisibleSubset = function(nums) {
    if (!nums || nums.length === 0) return [];
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const dp = new Int32Array(n).fill(1);
    const parent = new Int32Array(n).fill(-1);
    let maxLen = 1;
    let maxIdx = 0;
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] % nums[j] === 0 && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
            }
        }
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            maxIdx = i;
        }
    }
    const res = [];
    let cur = maxIdx;
    while (cur !== -1) {
        res.push(nums[cur]);
        cur = parent[cur];
    }
    return res.reverse();
};
var solve = typeof largestDivisibleSubset !== 'undefined' ? largestDivisibleSubset : null;
module.exports = solve;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const arg = JSON.parse(line);
        const result = solve(arg);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
