var alternatingXOR = function(nums, target1, target2) {
  const MOD = 1000000007;
  const S = 1 << 17;
  const g1 = new Int32Array(S), g2 = new Int32Array(S);
  g2[0] = 1;
  let p = 0, a = 0, b = 0;
  for (const x of nums) {
    p ^= x;
    a = g2[p ^ target1];
    b = g1[p ^ target2];
    g1[p] = (g1[p] + a) % MOD;
    g2[p] = (g2[p] + b) % MOD;
  }
  return (a + b) % MOD;
};
var solve = alternatingXOR;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = alternatingXOR;
