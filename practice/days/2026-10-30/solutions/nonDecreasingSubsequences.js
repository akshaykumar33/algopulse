var findSubsequences = function(nums) {
  const res = [];
  const path = [];
  function backtrack(start) {
    if (path.length >= 2) {
      res.push([...path]);
    }
    const used = new Set();
    for (let i = start; i < nums.length; i++) {
      if (used.has(nums[i])) continue;
      if (path.length === 0 || nums[i] >= path[path.length - 1]) {
        used.add(nums[i]);
        path.push(nums[i]);
        backtrack(i + 1);
        path.pop();
      }
    }
  }
  backtrack(0);
  return res;
};

var solve = function(nums) {
  return findSubsequences(nums);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
