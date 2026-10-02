var findKthPositive = function(arr, k) {
  let l = 0, r = arr.length;
  while (l < r) {
    let mid = (l + r) >> 1;
    if (arr[mid] - (mid + 1) < k) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l + k;
};
var solve = findKthPositive;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const arr = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        const result = solve(arr, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
