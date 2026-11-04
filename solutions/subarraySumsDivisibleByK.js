var subarraysDivByK = function(nums, k) {
  const map = new Map();
  map.set(0, 1);
  let sum = 0;
  let ans = 0;

  for (let i = 0; i < nums.length; i++) {
    sum = ((sum + nums[i]) % k + k) % k;
    const count = map.get(sum) || 0;
    ans += count;
    map.set(sum, count + 1);
  }

  return ans;
};

var subarraySumsDivisibleByK = subarraysDivByK;
var solve = typeof subarraySumsDivisibleByK !== 'undefined' ? subarraySumsDivisibleByK : null;

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
