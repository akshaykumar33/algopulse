var minAbsoluteDifference = function(nums, x) {
  if (x === 0) return 0;
  const n = nums.length;
  let ans = Infinity;

  const past = [];
  function binaryInsert(val) {
    let low = 0, high = past.length - 1;
    let pos = past.length;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (past[mid] >= val) {
        pos = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    past.splice(pos, 0, val);
  }

  function getMinDiff(val) {
    let low = 0, high = past.length - 1;
    let res = Infinity;
    while (low <= high) {
      const mid = (low + high) >> 1;
      const diff = Math.abs(past[mid] - val);
      if (diff < res) res = diff;
      if (past[mid] === val) return 0;
      if (past[mid] < val) low = mid + 1;
      else high = mid - 1;
    }
    return res;
  }

  for (let i = x; i < n; i++) {
    binaryInsert(nums[i - x]);
    const d = getMinDiff(nums[i]);
    if (d < ans) ans = d;
    if (ans === 0) break;
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(minAbsoluteDifference(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = minAbsoluteDifference;
