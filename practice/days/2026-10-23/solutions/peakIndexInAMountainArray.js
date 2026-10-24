var peakIndexInMountainArray = function(arr) {
  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    const mid = (l + r) >> 1;
    if (arr[mid] < arr[mid + 1]) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
};

var solve = peakIndexInMountainArray;

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const arr = JSON.parse(line);
        console.log(JSON.stringify(solve(arr)));
      }
    }
  } catch (err) {}
}

module.exports = solve;
