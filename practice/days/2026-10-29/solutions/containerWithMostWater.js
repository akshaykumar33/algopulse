var maxArea = function(height) {
  let left = 0;
  let right = height.length - 1;
  let max = 0;

  while (left < right) {
    const h = Math.min(height[left], height[right]);
    const area = h * (right - left);
    if (area > max) max = area;

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return max;
};

var solve = typeof maxArea !== 'undefined' ? maxArea : null;

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
