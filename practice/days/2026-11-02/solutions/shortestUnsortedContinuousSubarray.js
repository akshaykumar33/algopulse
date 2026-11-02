var shortestUnsortedContinuousSubarray = function(nums) {
    let n = nums.length;
    let l = -1, r = -1;
    let maxVal = nums[0];
    let minVal = nums[n - 1];
    for (let i = 0; i < n; i++) {
        if (nums[i] < maxVal) {
            r = i;
        } else {
            maxVal = nums[i];
        }
    }
    for (let i = n - 1; i >= 0; i--) {
        if (nums[i] > minVal) {
            l = i;
        } else {
            minVal = nums[i];
        }
    }
    return l === -1 ? 0 : r - l + 1;
};
var solve = typeof shortestUnsortedContinuousSubarray !== 'undefined' ? shortestUnsortedContinuousSubarray : null;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      console.log(JSON.stringify(shortestUnsortedContinuousSubarray(parsed)));
    }
  }
}

