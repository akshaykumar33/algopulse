var shoppingOffers = function(price, special, needs) {
    const memo = new Map();
    const getKey = (curNeeds) => curNeeds.join(',');
    const dfs = (curNeeds) => {
        const key = getKey(curNeeds);
        if (memo.has(key)) return memo.get(key);
        let minCost = 0;
        for (let i = 0; i < curNeeds.length; i++) {
            minCost += curNeeds[i] * price[i];
        }
        for (const offer of special) {
            const nextNeeds = [...curNeeds];
            let isValid = true;
            for (let i = 0; i < curNeeds.length; i++) {
                nextNeeds[i] -= offer[i];
                if (nextNeeds[i] < 0) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) {
                minCost = Math.min(minCost, offer[offer.length - 1] + dfs(nextNeeds));
            }
        }
        memo.set(key, minCost);
        return minCost;
    };
    return dfs(needs);
};
var solve = shoppingOffers;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 3) {
        const price = JSON.parse(lines[i]);
        const special = JSON.parse(lines[i+1]);
        const needs = JSON.parse(lines[i+2]);
        console.log(JSON.stringify(solve(price, special, needs)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
