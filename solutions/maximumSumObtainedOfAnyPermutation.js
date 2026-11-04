var maximumSumObtainedOfAnyPermutation = function(nums, requests) {
  const n = nums.length;
  const diff = new Int32Array(n + 1);
  for (let i = 0; i < requests.length; i++) {
    diff[requests[i][0]]++;
    diff[requests[i][1] + 1]--;
  }

  const count = new Int32Array(n);
  let cur = 0;
  for (let i = 0; i < n; i++) {
    cur += diff[i];
    count[i] = cur;
  }

  nums.sort((a, b) => a - b);
  count.sort();

  const MOD = 1000000007n;
  let ans = 0n;
  for (let i = 0; i < n; i++) {
    ans = (ans + BigInt(nums[i]) * BigInt(count[i])) % MOD;
  }

  return Number(ans);
};

var solve = typeof maximumSumObtainedOfAnyPermutation !== 'undefined' ? maximumSumObtainedOfAnyPermutation : null;

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
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
