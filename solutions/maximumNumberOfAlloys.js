var maxNumberOfAlloys = function(n, k, budget, composition, stock, cost) {
  let low = 0, high = 2000000000, ans = 0;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    let ok = false;
    for (let m = 0; m < k; m++) {
      let neededCost = 0;
      for (let j = 0; j < n; j++) {
        const required = mid * composition[m][j];
        if (required > stock[j]) {
          neededCost += (required - stock[j]) * cost[j];
          if (neededCost > budget) break;
        }
      }
      if (neededCost <= budget) {
        ok = true;
        break;
      }
    }
    if (ok) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return ans;
};
var solve = maxNumberOfAlloys;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2], parsed[3], parsed[4], parsed[5])));
    }
  } catch (e) {}
}
module.exports = maxNumberOfAlloys;