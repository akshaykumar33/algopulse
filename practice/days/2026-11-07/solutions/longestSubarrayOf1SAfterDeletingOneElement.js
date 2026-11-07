var longestSubarray = function(nums) {
  let l = 0, zeros = 0, ans = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === 0) zeros++;
    while (zeros > 1) {
      if (nums[l] === 0) zeros--;
      l++;
    }
    ans = Math.max(ans, r - l);
  }
  return ans;
};

var solve = typeof longestSubarray !== 'undefined' ? longestSubarray : null;

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
module.exports = { longestSubarray, solve };
