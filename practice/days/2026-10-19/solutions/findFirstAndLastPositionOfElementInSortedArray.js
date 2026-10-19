var searchRange = function(nums, target) {
    const findFirst = (arr, val) => {
        let l = 0, r = arr.length - 1, idx = -1;
        while (l <= r) {
            let m = Math.floor((l + r) / 2);
            if (arr[m] >= val) {
                r = m - 1;
            } else {
                l = m + 1;
            }
            if (arr[m] === val) idx = m;
        }
        return idx;
    };
    const findLast = (arr, val) => {
        let l = 0, r = arr.length - 1, idx = -1;
        while (l <= r) {
            let m = Math.floor((l + r) / 2);
            if (arr[m] <= val) {
                l = m + 1;
            } else {
                r = m - 1;
            }
            if (arr[m] === val) idx = m;
        }
        return idx;
    };
    return [findFirst(nums, target), findLast(nums, target)];
};

var solve = searchRange;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        try {
          const nums = JSON.parse(lines[i]);
          const target = JSON.parse(lines[i+1]);
          const result = solve(nums, target);
          console.log(JSON.stringify(result));
        } catch (e) {}
      }
    }
  } catch (err) {}
}
module.exports = solve;
