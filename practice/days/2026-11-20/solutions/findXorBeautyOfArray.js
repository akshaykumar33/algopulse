var xorBeauty = function(nums) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) ans ^= nums[i];
  return ans;
};

var solve = xorBeauty;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = xorBeauty;