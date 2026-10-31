var wiggleSort = function(nums) {
    const sorted = nums.slice().sort((a, b) => a - b);
    const n = nums.length;
    let left = Math.floor((n - 1) / 2);
    let right = n - 1;

    for (let i = 0; i < n; i++) {
        if (i % 2 === 0) {
            nums[i] = sorted[left--];
        } else {
            nums[i] = sorted[right--];
        }
    }
    return nums;
};

var solve = typeof wiggleSort !== 'undefined' ? wiggleSort : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
          console.log(JSON.stringify(result));
        } catch (_) {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = solve;

