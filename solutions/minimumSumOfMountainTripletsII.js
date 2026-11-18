var minimumSum = function(nums) {
  const n = nums.length;
  const pref = new Int32Array(n);
  pref[0] = nums[0];
  for (let i = 1; i < n; i++) {
    pref[i] = Math.min(pref[i - 1], nums[i]);
  }

  const suff = new Int32Array(n);
  suff[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    suff[i] = Math.min(suff[i + 1], nums[i]);
  }

  let ans = Infinity;
  for (let j = 1; j < n - 1; j++) {
    if (nums[j] > pref[j - 1] && nums[j] > suff[j + 1]) {
      const sum = pref[j - 1] + nums[j] + suff[j + 1];
      if (sum < ans) ans = sum;
    }
  }

  return ans === Infinity ? -1 : ans;
};

var solve = minimumSum;

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

module.exports = minimumSum;
