var maxTurbulenceSize = function(arr) {
  const n = arr.length;
  if (n <= 1) return n;
  let ans = 1, inc = 1, dec = 1;
  for (let i = 1; i < n; i++) {
    if (arr[i] > arr[i - 1]) {
      inc = dec + 1;
      dec = 1;
    } else if (arr[i] < arr[i - 1]) {
      dec = inc + 1;
      inc = 1;
    } else {
      inc = 1;
      dec = 1;
    }
    ans = Math.max(ans, inc, dec);
  }
  return ans;
};
var solve = maxTurbulenceSize;
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
module.exports = maxTurbulenceSize;