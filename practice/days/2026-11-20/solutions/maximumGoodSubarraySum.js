var maximumSubarraySum = function(nums, k) {
  let minPref = new Map();
  let pref = 0;
  let ans = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    if (!minPref.has(x) || pref < minPref.get(x)) {
      minPref.set(x, pref);
    }
    pref += x;
    if (minPref.has(x - k)) {
      ans = Math.max(ans, pref - minPref.get(x - k));
    }
    if (minPref.has(x + k)) {
      ans = Math.max(ans, pref - minPref.get(x + k));
    }
  }
  return ans === -Infinity ? 0 : ans;
};

var solve = maximumSubarraySum;

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

module.exports = maximumSubarraySum;