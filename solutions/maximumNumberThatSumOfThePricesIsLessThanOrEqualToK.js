var findMaximumNumber = function(k, x) {
  const K = BigInt(k);
  const X = BigInt(x);

  function count(num) {
    let total = 0n;
    for (let p = X; ; p += X) {
      const B = 1n << (p - 1n);
      if (B > num) break;
      const period = 2n * B;
      const full = (num + 1n) / period;
      const rem = (num + 1n) % period;
      const extra = rem > B ? rem - B : 0n;
      total += full * B + extra;
    }
    return total;
  }

  let low = 1n;
  let high = (K + 1n) * (1n << X);
  let ans = 1n;

  while (low <= high) {
    const mid = (low + high) / 2n;
    if (count(mid) <= K) {
      ans = mid;
      low = mid + 1n;
    } else {
      high = mid - 1n;
    }
  }

  return Number(ans);
};

var solve = findMaximumNumber;

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

module.exports = findMaximumNumber;
