var minimumArrayLength = function(nums) {
  let min = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < min) min = nums[i];
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % min !== 0) return 1;
  }

  let cnt = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === min) cnt++;
  }

  return Math.floor((cnt + 1) / 2);
};

var solve = minimumArrayLength;

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

module.exports = minimumArrayLength;
