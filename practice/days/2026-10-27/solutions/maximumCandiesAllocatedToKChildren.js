var maximumCandies = function(candies, k) {
    let l = 1;
    let r = 0;
    for (let i = 0; i < candies.length; i++) {
        if (candies[i] > r) {
            r = candies[i];
        }
    }
    let ans = 0;
    while (l <= r) {
        let m = Math.floor((l + r) / 2);
        let cnt = 0;
        for (let i = 0; i < candies.length; i++) {
            cnt += Math.floor(candies[i] / m);
        }
        if (cnt >= k) {
            ans = m;
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return ans;
};
var solve = typeof maximumCandies !== 'undefined' ? maximumCandies : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const candies = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i+1]);
        const result = solve(candies, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
