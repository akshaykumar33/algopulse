var minOperations = function(nums) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    map.set(val, (map.get(val) || 0) + 1);
  }

  let ans = 0;
  for (const cnt of map.values()) {
    if (cnt === 1) return -1;
    ans += Math.ceil(cnt / 3);
  }

  return ans;
};

var solve = minOperations;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      const arg = Array.isArray(parsed) && parsed.length === 1 ? parsed[0] : parsed;
      console.log(JSON.stringify(solve(arg)));
    }
  } catch (e) {}
}

module.exports = minOperations;
