var countTrapezoids = function(points) {
  const MOD = 1000000007n;
  const cnt = new Map();
  for (const [, y] of points) cnt.set(y, (cnt.get(y) || 0) + 1);
  let sum = 0n, ans = 0n;
  for (const c of cnt.values()) {
    const e = BigInt(c) * BigInt(c - 1) / 2n % MOD;
    ans = (ans + e * sum) % MOD;
    sum = (sum + e) % MOD;
  }
  return Number(ans);
};
var solve = countTrapezoids;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = countTrapezoids;
