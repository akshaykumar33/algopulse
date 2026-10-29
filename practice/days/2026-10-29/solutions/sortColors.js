var sortColors = function(nums) {
  let p0 = 0;
  let curr = 0;
  let p2 = nums.length - 1;

  while (curr <= p2) {
    if (nums[curr] === 0) {
      const tmp = nums[p0];
      nums[p0] = nums[curr];
      nums[curr] = tmp;
      p0++;
      curr++;
    } else if (nums[curr] === 2) {
      const tmp = nums[p2];
      nums[p2] = nums[curr];
      nums[curr] = tmp;
      p2--;
    } else {
      curr++;
    }
  }
};

function solveSortColors(nums) {
  sortColors(nums);
  return nums;
}
var solve = solveSortColors;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const nums = JSON.parse(raw);
    console.log(JSON.stringify(solveSortColors(nums)));
  }
}
module.exports = solve;
