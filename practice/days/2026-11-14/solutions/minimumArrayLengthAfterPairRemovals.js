var minLengthAfterRemovals = function(nums) {
  const n = nums.length;
  let maxFreq = 0;
  let curFreq = 1;
  for (let i = 1; i < n; i++) {
    if (nums[i] === nums[i - 1]) curFreq++;
    else {
      if (curFreq > maxFreq) maxFreq = curFreq;
      curFreq = 1;
    }
  }
  if (curFreq > maxFreq) maxFreq = curFreq;

  if (maxFreq > Math.floor(n / 2)) {
    return 2 * maxFreq - n;
  }
  return n % 2;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(minLengthAfterRemovals(JSON.parse(l))));
  }
}

module.exports = minLengthAfterRemovals;
