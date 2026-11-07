var minSumOfLengths = function(arr, target) {
  const n = arr.length;
  const dp = new Array(n).fill(Infinity);
  let ans = Infinity;
  let curMin = Infinity;
  let curSum = 0;
  let l = 0;
  for (let r = 0; r < n; r++) {
    curSum += arr[r];
    while (curSum > target) {
      curSum -= arr[l++];
    }
    if (curSum === target) {
      const len = r - l + 1;
      if (l > 0 && dp[l - 1] !== Infinity) {
        if (len + dp[l - 1] < ans) ans = len + dp[l - 1];
      }
      if (len < curMin) curMin = len;
    }
    dp[r] = curMin;
  }
  return ans === Infinity ? -1 : ans;
};

var solve = minSumOfLengths;

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
  } catch (err) {
    console.error(err);
  }
}

module.exports = solve;
