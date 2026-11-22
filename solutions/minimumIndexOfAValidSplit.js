var minimumIndex = function(nums) {
  const n = nums.length;
  let dom = nums[0], count = 0;
  for (let i = 0; i < n; i++) {
    if (count === 0) {
      dom = nums[i];
      count = 1;
    } else if (nums[i] === dom) {
      count++;
    } else {
      count--;
    }
  }
  let totalDom = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] === dom) totalDom++;
  }
  let leftDom = 0;
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] === dom) leftDom++;
    const rightDom = totalDom - leftDom;
    if (leftDom * 2 > (i + 1) && rightDom * 2 > (n - 1 - i)) {
      return i;
    }
  }
  return -1;
};
var solve = minimumIndex;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0])));
    }
  } catch (e) {}
}
module.exports = minimumIndex;