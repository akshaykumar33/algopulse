var matrixSum = function(nums) {
  for (let r = 0; r < nums.length; r++) {
    nums[r].sort((a, b) => a - b);
  }
  let score = 0;
  const m = nums[0].length;
  for (let c = 0; c < m; c++) {
    let maxVal = 0;
    for (let r = 0; r < nums.length; r++) {
      if (nums[r][c] > maxVal) maxVal = nums[r][c];
    }
    score += maxVal;
  }
  return score;
};

var solve = matrixSum;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      const matrix = (parsed.length === 1 && Array.isArray(parsed[0]) && Array.isArray(parsed[0][0])) ? parsed[0] : parsed;
      console.log(JSON.stringify(solve(matrix)));
    }
  } catch (e) {}
}

module.exports = matrixSum;