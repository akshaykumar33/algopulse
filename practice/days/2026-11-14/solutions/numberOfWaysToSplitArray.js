var waysToSplitArray = function(nums) {
  let total = 0n;
  for (let i = 0; i < nums.length; i++) total += BigInt(nums[i]);

  let left = 0n;
  let ans = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    left += BigInt(nums[i]);
    const right = total - left;
    if (left >= right) ans++;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(waysToSplitArray(JSON.parse(l))));
  }
}

module.exports = waysToSplitArray;
