var maxAbsValExpr = function(arr1, arr2) {
  const n = arr1.length;
  let ans = 0;
  const signs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  for (let s = 0; s < 4; s++) {
    const p = signs[s][0], q = signs[s][1];
    let minVal = Infinity, maxVal = -Infinity;
    for (let i = 0; i < n; i++) {
      const val = p * arr1[i] + q * arr2[i] + i;
      if (val < minVal) minVal = val;
      if (val > maxVal) maxVal = val;
    }
    ans = Math.max(ans, maxVal - minVal);
  }
  return ans;
};
var solve = maxAbsValExpr;
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
module.exports = maxAbsValExpr;