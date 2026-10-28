var maximumGap = function(nums) {
  const n = nums.length;
  if (n < 2) return 0;

  let minVal = nums[0], maxVal = nums[0];
  for (let i = 1; i < n; i++) {
    if (nums[i] < minVal) minVal = nums[i];
    if (nums[i] > maxVal) maxVal = nums[i];
  }

  if (minVal === maxVal) return 0;

  const bSize = Math.max(1, Math.floor((maxVal - minVal) / (n - 1)));
  const bCount = Math.floor((maxVal - minVal) / bSize) + 1;

  const bMin = new Array(bCount).fill(null);
  const bMax = new Array(bCount).fill(null);

  for (let i = 0; i < n; i++) {
    const idx = Math.floor((nums[i] - minVal) / bSize);
    if (bMin[idx] === null || nums[i] < bMin[idx]) bMin[idx] = nums[i];
    if (bMax[idx] === null || nums[i] > bMax[idx]) bMax[idx] = nums[i];
  }

  let maxGap = 0;
  let prevMax = minVal;

  for (let i = 0; i < bCount; i++) {
    if (bMin[i] === null) continue;
    const gap = bMin[i] - prevMax;
    if (gap > maxGap) maxGap = gap;
    prevMax = bMax[i];
  }

  return maxGap;
};

var solve = function(nums) {
  return maximumGap(nums);
};

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

