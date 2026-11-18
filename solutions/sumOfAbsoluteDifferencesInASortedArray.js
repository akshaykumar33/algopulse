var getSumAbsoluteDifferences = function(nums) {
  const n = nums.length;
  const pref = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + nums[i];
  }

  const ans = new Array(n);
  for (let i = 0; i < n; i++) {
    ans[i] = i * nums[i] - pref[i] + (pref[n] - pref[i + 1]) - (n - 1 - i) * nums[i];
  }

  return ans;
};

var solve = getSumAbsoluteDifferences;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = getSumAbsoluteDifferences;
