var solve = function(n) {
  let ans = Array.from({ length: n }, () => Array(n).fill(0));
  let top = 0, bottom = n - 1, left = 0, right = n - 1;
  let val = 1;
  while (top <= bottom && left <= right) {
    for (let j = left; j <= right; j++) {
      ans[top][j] = val++;
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      ans[i][right] = val++;
    }
    right--;
    if (top <= bottom) {
      for (let j = right; j >= left; j--) {
        ans[bottom][j] = val++;
      }
      bottom--;
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        ans[i][left] = val++;
      }
      left++;
    }
  }
  return ans;
};

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
