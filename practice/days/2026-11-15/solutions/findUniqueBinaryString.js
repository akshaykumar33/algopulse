var findDifferentBinaryString = function(nums) {
  let ans = '';
  for (let i = 0; i < nums.length; i++) {
    ans += nums[i][i] === '0' ? '1' : '0';
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(JSON.stringify(findDifferentBinaryString(JSON.parse(lines[i]))));
    }
  }
}

module.exports = findDifferentBinaryString;
