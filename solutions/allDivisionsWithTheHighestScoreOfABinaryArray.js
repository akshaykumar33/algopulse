var maxScoreIndices = function(nums) {
  const n = nums.length;
  let ones = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) ones++;
  }

  let zeros = 0;
  let maxScore = zeros + ones;
  let ans = [0];

  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) {
      zeros++;
    } else {
      ones--;
    }
    const curScore = zeros + ones;
    if (curScore > maxScore) {
      maxScore = curScore;
      ans = [i + 1];
    } else if (curScore === maxScore) {
      ans.push(i + 1);
    }
  }

  return ans;
};

var solve = maxScoreIndices;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = maxScoreIndices;
