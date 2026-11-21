var smallestTrimmedNumbers = function(nums, queries) {
  const out = [];
  const n = nums.length;
  for (const [k, trim] of queries) {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push({ val: nums[i].slice(nums[i].length - trim), idx: i });
    }
    arr.sort((a, b) => {
      if (a.val < b.val) return -1;
      if (a.val > b.val) return 1;
      return a.idx - b.idx;
    });
    out.push(arr[k - 1].idx);
  }
  return out;
};

var solve = smallestTrimmedNumbers;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = smallestTrimmedNumbers;