var rangeSum = function(nums, n, left, right) {
  const MOD = 1000000007;
  const total = (n * (n + 1)) >> 1;
  const sums = new Int32Array(total);
  let idx = 0;
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let j = i; j < n; j++) {
      s += nums[j];
      sums[idx++] = s;
    }
  }
  sums.sort();
  let ans = 0;
  for (let i = left - 1; i < right; i++) {
    ans = (ans + sums[i]) % MOD;
  }
  return ans;
};

var solve = rangeSum;
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
  } catch (err) {}
}
module.exports = solve;
