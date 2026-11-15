var maxScore = function(nums) {
  nums.sort((a, b) => b - a);
  let ans = 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (sum > 0) ans++;
    else break;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(JSON.stringify(maxScore(JSON.parse(lines[i]))));
    }
  }
}

module.exports = maxScore;
