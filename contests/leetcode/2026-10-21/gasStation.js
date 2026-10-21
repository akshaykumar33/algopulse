var solve = function(gas, cost) {
    let totalGas = 0;
    let totalCost = 0;
    for (let i = 0; i < gas.length; i++) {
        totalGas += gas[i];
        totalCost += cost[i];
    }
    if (totalGas < totalCost) return -1;

    let start = 0;
    let cur = 0;
    for (let i = 0; i < gas.length; i++) {
        cur += gas[i] - cost[i];
        if (cur < 0) {
            start = i + 1;
            cur = 0;
        }
    }
    return start;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let i = 0;
      while (i < lines.length) {
        const gas = JSON.parse(lines[i++]);
        const cost = JSON.parse(lines[i++]);
        const result = solve(gas, cost);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
