var maximumSubarraySum = function(nums, k) {
  const n = nums.length;
  let maxVal = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] > maxVal) maxVal = nums[i];
  }
  const useMap = maxVal > 200000;
  const freq = useMap ? new Map() : new Int32Array(maxVal + 1);
  let curSum = 0;
  let distinct = 0;
  let ans = 0;

  for (let i = 0; i < n; i++) {
    const val = nums[i];
    curSum += val;
    if (useMap) {
      const f = freq.get(val) || 0;
      if (f === 0) distinct++;
      freq.set(val, f + 1);
    } else {
      if (freq[val] === 0) distinct++;
      freq[val]++;
    }

    if (i >= k) {
      const out = nums[i - k];
      curSum -= out;
      if (useMap) {
        const f = freq.get(out);
        if (f === 1) {
          distinct--;
          freq.delete(out);
        } else {
          freq.set(out, f - 1);
        }
      } else {
        freq[out]--;
        if (freq[out] === 0) distinct--;
      }
    }

    if (i >= k - 1 && distinct === k) {
      if (curSum > ans) ans = curSum;
    }
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    if (lines.length === 1) {
      const parsed = JSON.parse(lines[0]);
      console.log(JSON.stringify(maximumSubarraySum(...parsed)));
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const nums = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(maximumSubarraySum(nums, k)));
      }
    }
  }
}

module.exports = maximumSubarraySum;
