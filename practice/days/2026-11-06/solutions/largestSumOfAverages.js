var largestSumOfAverages = function(nums, k) {
  const n = nums.length;
  const pref = new Float64Array(n + 1);
  for (let i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + nums[i];
  }

  let dp = new Float64Array(n + 1);
  for (let i = 1; i <= n; i++) {
    dp[i] = pref[i] / i;
  }

  for (let m = 2; m <= k; m++) {
    const nextDp = new Float64Array(n + 1);
    for (let i = m; i <= n; i++) {
      let best = 0;
      for (let j = m - 1; j < i; j++) {
        const cur = dp[j] + (pref[i] - pref[j]) / (i - j);
        if (cur > best) best = cur;
      }
      nextDp[i] = best;
    }
    dp = nextDp;
  }

  return Math.round(dp[n] * 1e5) / 1e5;
};

var solve = typeof largestSumOfAverages !== 'undefined' ? largestSumOfAverages : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const nums = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(nums, k)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

