var longestSubarray = function(nums, limit) {
  const maxQ = [];
  const minQ = [];
  let left = 0;
  let ans = 0;
  for (let right = 0; right < nums.length; right++) {
    const v = nums[right];
    while (maxQ.length > 0 && maxQ[maxQ.length - 1] < v) maxQ.pop();
    maxQ.push(v);
    while (minQ.length > 0 && minQ[minQ.length - 1] > v) minQ.pop();
    minQ.push(v);

    while (maxQ[0] - minQ[0] > limit) {
      if (nums[left] === maxQ[0]) maxQ.shift();
      if (nums[left] === minQ[0]) minQ.shift();
      left++;
    }
    const len = right - left + 1;
    if (len > ans) ans = len;
  }
  return ans;
};

var solve = longestSubarray;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed[0], parsed[1])));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = longestSubarray;
