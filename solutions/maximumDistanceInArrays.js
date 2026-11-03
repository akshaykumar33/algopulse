var maximumDistanceInArrays = function(arrays) {
    let ans = 0;
    let minVal = arrays[0][0];
    let maxVal = arrays[0][arrays[0].length - 1];
    for (let i = 1; i < arrays.length; i++) {
        let arr = arrays[i];
        let curMin = arr[0];
        let curMax = arr[arr.length - 1];
        ans = Math.max(ans, Math.abs(curMax - minVal), Math.abs(maxVal - curMin));
        minVal = Math.min(minVal, curMin);
        maxVal = Math.max(maxVal, curMax);
    }
    return ans;
};
var solve = typeof maximumDistanceInArrays !== 'undefined' ? maximumDistanceInArrays : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
