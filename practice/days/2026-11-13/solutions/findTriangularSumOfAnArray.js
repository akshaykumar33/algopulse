var triangularSum = function(nums) {
  let n = nums.length;
  while (n > 1) {
    for (let i = 0; i < n - 1; i++) {
      nums[i] = (nums[i] + nums[i + 1]) % 10;
    }
    n--;
  }
  return nums[0];
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(triangularSum(JSON.parse(line))));
    }
  }
}

module.exports = triangularSum;
