var minCapability = function(nums, k) {
  let lo = 1, hi = 1e9, ans = hi;
  function check(cap) {
    let c = 0, i = 0;
    while (i < nums.length) {
      if (nums[i] <= cap) {
        c++;
        i += 2;
      } else {
        i++;
      }
    }
    return c >= k;
  }
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (check(mid)) {
      ans = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  return ans;
};

var solve = minCapability;

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

module.exports = minCapability;