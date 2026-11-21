var findDifferentBinaryString = function(nums) {
  let ans = '';
  for (let i = 0; i < nums.length; i++) {
    ans += nums[i][i] === '0' ? '1' : '0';
  }
  return ans;
};

var solve = findDifferentBinaryString;

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

module.exports = findDifferentBinaryString;