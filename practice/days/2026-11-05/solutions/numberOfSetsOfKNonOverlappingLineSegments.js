var numberOfSetsOfKNonOverlappingLineSegments = function(n, k) {
    const MOD = 1000000007;
    const total = n + k - 1;
    const m = 2 * k;
    let c = 1;
    for (let i = 0; i < m; i++) {
        c = Number((BigInt(c) * BigInt(total - i)) / BigInt(i + 1));
    }
    return Number(BigInt(c) % BigInt(MOD));
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
