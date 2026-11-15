var canSplitArray = function(nums, m) {
  if (nums.length <= 2) return true;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] + nums[i + 1] >= m) return true;
  }
  return false;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(canSplitArray(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = canSplitArray;
