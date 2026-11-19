var minOperations = function(nums) {
  let flips = 0;
  for (let i = 0; i < nums.length; i++) {
    if ((nums[i] + flips) % 2 === 0) {
      flips++;
    }
  }
  return flips;
};

var solve = minOperations;

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

module.exports = minOperations;
