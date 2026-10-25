var solve = function(arr, k, x) {
    let l = 0;
    let r = arr.length - k;
    while (l < r) {
        let m = Math.floor((l + r) / 2);
        if (x - arr[m] > arr[m + k] - x) {
            l = m + 1;
        } else {
            r = m;
        }
    }
    return arr.slice(l, l + k);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let i = 0;
      while (i < lines.length) {
        const arr = JSON.parse(lines[i++]);
        const k = JSON.parse(lines[i++]);
        const x = JSON.parse(lines[i++]);
        const result = solve(arr, k, x);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
