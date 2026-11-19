var minimizedMaximum = function(n, quantities) {
  let low = 1;
  let high = 0;
  for (let i = 0; i < quantities.length; i++) {
    if (quantities[i] > high) high = quantities[i];
  }

  function check(cap) {
    let stores = 0;
    for (let i = 0; i < quantities.length; i++) {
      stores += Math.ceil(quantities[i] / cap);
      if (stores > n) return false;
    }
    return stores <= n;
  }

  let ans = high;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (check(mid)) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return ans;
};

var solve = minimizedMaximum;

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

module.exports = minimizedMaximum;
