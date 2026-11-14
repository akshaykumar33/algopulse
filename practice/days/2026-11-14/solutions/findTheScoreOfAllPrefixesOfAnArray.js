var findPrefixScore = function(nums) {
  const n = nums.length;
  const ans = new Array(n);
  let maxVal = 0;
  let running = 0;

  for (let i = 0; i < n; i++) {
    if (nums[i] > maxVal) maxVal = nums[i];
    const conver = nums[i] + maxVal;
    running += conver;
    ans[i] = running;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(findPrefixScore(JSON.parse(l))));
  }
}

module.exports = findPrefixScore;
