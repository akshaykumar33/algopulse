var maxNumOfMarkedIndices = function(nums) {
  const arr = nums.slice().sort((a, b) => a - b);
  const n = arr.length;
  const mid = Math.floor(n / 2);
  let i = 0;
  let j = mid;
  let ans = 0;

  while (i < mid && j < n) {
    if (2 * arr[i] <= arr[j]) {
      ans += 2;
      i++;
      j++;
    } else {
      j++;
    }
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(maxNumOfMarkedIndices(JSON.parse(line))));
    }
  }
}

module.exports = maxNumOfMarkedIndices;
