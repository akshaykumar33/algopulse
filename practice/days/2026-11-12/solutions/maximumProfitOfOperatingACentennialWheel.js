var minOperationsMaxProfit = function(customers, boardingCost, runningCost) {
  let wait = 0;
  let profit = 0;
  let maxProfit = 0;
  let best = -1;
  let rot = 0;
  const n = customers.length;

  for (let i = 0; i < n; i++) {
    wait += customers[i];
    const board = wait < 4 ? wait : 4;
    wait -= board;
    rot++;
    profit += board * boardingCost - runningCost;
    if (profit > maxProfit) {
      maxProfit = profit;
      best = rot;
    }
  }

  if (wait > 0 && 4 * boardingCost > runningCost) {
    const full = Math.floor(wait / 4);
    if (full > 0) {
      rot += full;
      profit += full * (4 * boardingCost - runningCost);
      wait %= 4;
      if (profit > maxProfit) {
        maxProfit = profit;
        best = rot;
      }
    }
    if (wait > 0 && wait * boardingCost > runningCost) {
      rot++;
      profit += wait * boardingCost - runningCost;
      if (profit > maxProfit) {
        maxProfit = profit;
        best = rot;
      }
    }
  }

  return best;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === 3 && Array.isArray(p[0]) && typeof p[1] === 'number';
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(minOperationsMaxProfit(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 2 < lines.length; i += 3) {
        const args = lines.slice(i, i + 3).map((l) => JSON.parse(l));
        console.log(JSON.stringify(minOperationsMaxProfit(...args)));
      }
    }
  }
}

module.exports = minOperationsMaxProfit;
