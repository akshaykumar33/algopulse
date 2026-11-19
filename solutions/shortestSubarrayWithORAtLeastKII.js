var minimumSubarrayLength = function(nums, k) {
  if (k === 0) return 1;
  const bitCount = new Int32Array(32);
  let curOR = 0;
  let ans = Infinity;
  let l = 0;

  for (let r = 0; r < nums.length; r++) {
    const val = nums[r];
    curOR |= val;
    for (let b = 0; b < 30; b++) {
      if ((val >> b) & 1) {
        bitCount[b]++;
      }
    }

    while (curOR >= k && l <= r) {
      if (r - l + 1 < ans) {
        ans = r - l + 1;
      }
      const rem = nums[l];
      let newOR = 0;
      for (let b = 0; b < 30; b++) {
        if ((rem >> b) & 1) {
          bitCount[b]--;
        }
        if (bitCount[b] > 0) {
          newOR |= (1 << b);
        }
      }
      curOR = newOR;
      l++;
    }
  }

  return ans === Infinity ? -1 : ans;
};

var solve = minimumSubarrayLength;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = minimumSubarrayLength;
