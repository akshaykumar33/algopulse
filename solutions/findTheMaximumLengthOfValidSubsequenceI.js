var maximumLength = function(nums) {
  let c0 = 0, c1 = 0;
  let alt0 = 0, exp0 = 0;
  let alt1 = 0, exp1 = 1;
  for (let i = 0; i < nums.length; i++) {
    const p = nums[i] % 2;
    if (p === 0) c0++;
    else c1++;
    if (p === exp0) {
      alt0++;
      exp0 ^= 1;
    }
    if (p === exp1) {
      alt1++;
      exp1 ^= 1;
    }
  }
  return Math.max(c0, c1, alt0, alt1);
};

var solve = maximumLength;

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

module.exports = maximumLength;