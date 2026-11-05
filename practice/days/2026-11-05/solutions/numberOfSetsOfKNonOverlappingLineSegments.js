var numberOfSetsOfKNonOverlappingLineSegments = function(n, k) {
  let mod = 1000000007n;
  let N = BigInt(n + k - 1);
  let M = BigInt(2 * k);
  if (M > N) return 0;
  if (M > N - M) M = N - M;
  let num = 1n;
  let den = 1n;
  for (let i = 0n; i < M; i++) {
    num = (num * (N - i)) % mod;
    den = (den * (i + 1n)) % mod;
  }
  let power = function(base, exp) {
    let res = 1n;
    base = base % mod;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % mod;
      base = (base * base) % mod;
      exp = exp / 2n;
    }
    return res;
  };
  let invDen = power(den, mod - 2n);
  return Number((num * invDen) % mod);
};
var solve = typeof numberOfSetsOfKNonOverlappingLineSegments !== 'undefined' ? numberOfSetsOfKNonOverlappingLineSegments : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
