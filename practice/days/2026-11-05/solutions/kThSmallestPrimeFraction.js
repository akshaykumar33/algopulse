var kthSmallestPrimeFraction = function(arr, k) {
    let n = arr.length;
    let low = 0, high = 1;
    let res = [0, 1];
    
    for (let iter = 0; iter < 60; iter++) {
        let mid = (low + high) / 2;
        let count = 0;
        let p = 0, q = 1;
        let i = 0;
        
        for (let j = 1; j < n; j++) {
            while (i < j && arr[i] <= mid * arr[j]) {
                i++;
            }
            count += i;
            if (i > 0 && arr[i - 1] * q > p * arr[j]) {
                p = arr[i - 1];
                q = arr[j];
            }
        }
        
        if (count < k) {
            low = mid;
        } else {
            res[0] = p;
            res[1] = q;
            high = mid;
        }
    }
    
    return res;
};
var solve = typeof kthSmallestPrimeFraction !== 'undefined' ? kthSmallestPrimeFraction : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const arr = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i+1]);
        const result = solve(arr, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
