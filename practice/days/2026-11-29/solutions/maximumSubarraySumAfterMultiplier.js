var maxSubarraySum = function(nums, k) {
  const n = nums.length;
  const go = f => {
    let a = -Infinity, b = -Infinity, c = -Infinity, best = -Infinity;
    for (let i = 0; i < n; i++) {
      const x = nums[i], y = f(x);
      const na = Math.max(a, 0) + x;
      const nb = Math.max(a, b, 0) + y;
      const nc = Math.max(b, c) + x;
      a = na; b = nb; c = nc;
      if (b > best) best = b;
      if (c > best) best = c;
    }
    return best;
  };
  let ans = Math.max(go(x => x * k), go(x => Math.trunc(x / k)));
  if (n >= 2) {
    const kad = (l, r) => {
      let cur = -Infinity, best = -Infinity;
      for (let i = l; i < r; i++) { cur = Math.max(cur, 0) + nums[i]; if (cur > best) best = cur; }
      return best;
    };
    ans = Math.max(ans, kad(0, n - 1), kad(1, n));
  }
  return ans;
};
var solve = maxSubarraySum;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = maxSubarraySum;
