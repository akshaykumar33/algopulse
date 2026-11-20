var maxAmount = function(initialCurrency, pairs1, rates1, pairs2, rates2) {
  function getRates(initCur, pairs, rates) {
    const dist = new Map();
    dist.set(initCur, 1.0);
    const currencies = new Set();
    currencies.add(initCur);
    for (const [u, v] of pairs) {
      currencies.add(u);
      currencies.add(v);
    }
    const nodes = Array.from(currencies);
    for (let iter = 0; iter < nodes.length; iter++) {
      let updated = false;
      for (let i = 0; i < pairs.length; i++) {
        const [u, v] = pairs[i];
        const r = rates[i];
        if (dist.has(u)) {
          const cand = dist.get(u) * r;
          if (!dist.has(v) || cand > dist.get(v)) {
            dist.set(v, cand);
            updated = true;
          }
        }
        if (dist.has(v)) {
          const cand = dist.get(v) / r;
          if (!dist.has(u) || cand > dist.get(u)) {
            dist.set(u, cand);
            updated = true;
          }
        }
      }
      if (!updated) break;
    }
    return dist;
  }

  const day1 = getRates(initialCurrency, pairs1, rates1);
  let maxResult = 1.0;

  for (const [midCur, amount1] of day1.entries()) {
    const day2 = getRates(midCur, pairs2, rates2);
    if (day2.has(initialCurrency)) {
      maxResult = Math.max(maxResult, amount1 * day2.get(initialCurrency));
    }
  }

  return maxResult;
};

var solve = maxAmount;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2], parsed[3], parsed[4])));
    }
  } catch (e) {}
}

module.exports = maxAmount;