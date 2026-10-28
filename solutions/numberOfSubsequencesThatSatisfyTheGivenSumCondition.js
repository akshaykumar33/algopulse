var numSubseq = function(nums, target) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const mod = 1000000007;
  const pow2 = new Int32Array(n);
  pow2[0] = 1;
  for (let i = 1; i < n; i++) {
    pow2[i] = (pow2[i - 1] * 2) % mod;
  }

  let l = 0;
  let r = n - 1;
  let ans = 0;

  while (l <= r) {
    if (nums[l] + nums[r] <= target) {
      ans = (ans + pow2[r - l]) % mod;
      l++;
    } else {
      r--;
    }
  }

  return ans;
};

var solve = function(nums, target) {
  return numSubseq(nums, target);
};

// ---------------- LOCAL TEST HARNESS ----------------
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

