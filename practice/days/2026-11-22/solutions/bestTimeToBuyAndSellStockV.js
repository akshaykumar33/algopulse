var maximumProfit = function(prices, k) {
  const n = prices.length;
  let flat = new Float64Array(k + 1).fill(-Infinity);
  let longP = new Float64Array(k + 1).fill(-Infinity);
  let shortP = new Float64Array(k + 1).fill(-Infinity);
  flat[0] = 0;
  for (let i = 0; i < n; i++) {
    const p = prices[i];
    const nextFlat = new Float64Array(flat);
    const nextLong = new Float64Array(longP);
    const nextShort = new Float64Array(shortP);
    for (let t = 0; t <= k; t++) {
      if (flat[t] !== -Infinity) {
        nextLong[t] = Math.max(nextLong[t], flat[t] - p);
        nextShort[t] = Math.max(nextShort[t], flat[t] + p);
      }
      if (t > 0) {
        if (longP[t - 1] !== -Infinity) {
          nextFlat[t] = Math.max(nextFlat[t], longP[t - 1] + p);
        }
        if (shortP[t - 1] !== -Infinity) {
          nextFlat[t] = Math.max(nextFlat[t], shortP[t - 1] - p);
        }
      }
    }
    flat = nextFlat;
    longP = nextLong;
    shortP = nextShort;
  }
  let ans = 0;
  for (let t = 0; t <= k; t++) {
    ans = Math.max(ans, flat[t]);
  }
  return ans;
};
var solve = maximumProfit;
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
module.exports = maximumProfit;