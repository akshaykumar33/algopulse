var shipWithinDays = function(weights, days) {
    let left = Math.max(...weights);
    let right = weights.reduce((a, b) => a + b, 0);
    let ans = right;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        let cur = 0;
        let cnt = 1;
        for (const w of weights) {
            if (cur + w > mid) {
                cnt++;
                cur = w;
            } else {
                cur += w;
            }
        }
        if (cnt <= days) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};
var solve = shipWithinDays;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const weights = JSON.parse(lines[i]);
        const days = JSON.parse(lines[i + 1]);
        const result = solve(weights, days);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
