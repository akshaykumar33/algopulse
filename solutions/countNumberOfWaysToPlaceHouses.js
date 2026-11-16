var countHousePlacements = function(n) {
  const MOD = 1000000007n;
  let a = 1n;
  let b = 2n;
  for (let i = 2; i <= n; i++) {
    const c = (a + b) % MOD;
    a = b;
    b = c;
  }
  return Number((b * b) % MOD);
};

var solve = countHousePlacements;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}
