var repairCars = function(ranks, cars) {
  let lo = 1n, hi = 100000000000000n, ans = hi;
  const bigCars = BigInt(cars);
  function check(time) {
    let rep = 0n;
    for (let i = 0; i < ranks.length; i++) {
      const r = BigInt(ranks[i]);
      const maxN = BigInt(Math.floor(Math.sqrt(Number(time / r))));
      rep += maxN;
      if (rep >= bigCars) return true;
    }
    return rep >= bigCars;
  }
  while (lo <= hi) {
    const mid = (lo + hi) / 2n;
    if (check(mid)) {
      ans = mid;
      hi = mid - 1n;
    } else {
      lo = mid + 1n;
    }
  }
  return Number(ans);
};

var solve = repairCars;

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

module.exports = repairCars;