var getMaxLen = function(nums) {
  let pos = 0;
  let neg = 0;
  let ans = 0;

  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (x > 0) {
      pos = pos + 1;
      neg = neg > 0 ? neg + 1 : 0;
    } else if (x < 0) {
      const newPos = neg > 0 ? neg + 1 : 0;
      const newNeg = pos + 1;
      pos = newPos;
      neg = newNeg;
    } else {
      pos = 0;
      neg = 0;
    }
    if (pos > ans) ans = pos;
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(getMaxLen(JSON.parse(line))));
    }
  }
}

module.exports = getMaxLen;
