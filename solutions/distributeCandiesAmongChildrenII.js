var distributeCandies = function(n, limit) {
  function c2(k) {
    if (k < 0) return 0n;
    const K = BigInt(k);
    return (K + 2n) * (K + 1n) / 2n;
  }

  const L = limit + 1;
  const ans = c2(n) - 3n * c2(n - L) + 3n * c2(n - 2 * L) - c2(n - 3 * L);
  return Number(ans);
};

var solve = distributeCandies;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
