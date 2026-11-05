var maxProfit = function(inventory, orders) {
    const MOD = 1000000007n;
    let low = 0n;
    let high = 0n;
    for (let i = 0; i < inventory.length; i++) {
        const val = BigInt(inventory[i]);
        if (val > high) high = val;
    }
    const ord = BigInt(orders);

    function count(k) {
        let cnt = 0n;
        for (let i = 0; i < inventory.length; i++) {
            const val = BigInt(inventory[i]);
            if (val > k) cnt += val - k;
        }
        return cnt;
    }

    let k = 0n;
    while (low <= high) {
        const mid = (low + high) / 2n;
        if (count(mid) <= ord) {
            k = mid;
            high = mid - 1n;
        } else {
            low = mid + 1n;
        }
    }

    let ans = 0n;
    let sold = 0n;
    for (let i = 0; i < inventory.length; i++) {
        const val = BigInt(inventory[i]);
        if (val > k) {
            const num = val - k;
            sold += num;
            const sum = (val + k + 1n) * num / 2n;
            ans = (ans + sum) % MOD;
        }
    }
    const rem = ord - sold;
    ans = (ans + rem * k) % MOD;
    return Number(ans);
};
var solve = typeof maxProfit !== 'undefined' ? maxProfit : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const inventory = JSON.parse(lines[i]);
        const orders = JSON.parse(lines[i + 1]);
        const result = solve(inventory, orders);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

