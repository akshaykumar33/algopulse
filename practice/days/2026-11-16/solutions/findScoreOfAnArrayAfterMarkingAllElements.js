var findScore = function(nums) {
  const n = nums.length;
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = [nums[i], i];
  }
  arr.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);

  const marked = new Uint8Array(n);
  let score = 0;

  for (let i = 0; i < n; i++) {
    const [val, idx] = arr[i];
    if (!marked[idx]) {
      score += val;
      marked[idx] = 1;
      if (idx > 0) marked[idx - 1] = 1;
      if (idx < n - 1) marked[idx + 1] = 1;
    }
  }
  return score;
};

var solve = findScore;

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
