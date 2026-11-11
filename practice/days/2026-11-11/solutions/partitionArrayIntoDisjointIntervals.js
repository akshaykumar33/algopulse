var partitionDisjoint = function(nums) {
  let leftMax = nums[0];
  let curMax = nums[0];
  let split = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < leftMax) {
      leftMax = curMax;
      split = i;
    } else if (nums[i] > curMax) {
      curMax = nums[i];
    }
  }
  return split + 1;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (const line of lines) {
      console.log(JSON.stringify(partitionDisjoint(JSON.parse(line))));
    }
  }
}

module.exports = partitionDisjoint;
