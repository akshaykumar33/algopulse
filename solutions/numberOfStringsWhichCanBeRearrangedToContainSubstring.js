var stringCount = function(n) {
  const MOD = 1000000007n;
  function pow(b, e) {
    let res = 1n;
    b = BigInt(b) % MOD;
    e = BigInt(e);
    while (e > 0n) {
      if (e & 1n) res = (res * b) % MOD;
      b = (b * b) % MOD;
      e >>= 1n;
    }
    return res;
  }
  const N = BigInt(n);
  if (N < 4n) return 0;
  let total = pow(26, N);
  let noL = pow(25, N);
  let noT = pow(25, N);
  let noE = pow(25, N);
  let oneE = (N * pow(25, N - 1n)) % MOD;
  let badE = (noE + oneE) % MOD;
  let noL_noT = pow(24, N);
  let noL_badE = (pow(24, N) + N * pow(24, N - 1n)) % MOD;
  let noT_badE = (pow(24, N) + N * pow(24, N - 1n)) % MOD;
  let noL_noT_badE = (pow(23, N) + N * pow(23, N - 1n)) % MOD;
  let bad = (noL + noT + badE - noL_noT - noL_badE - noT_badE + noL_noT_badE) % MOD;
  let ans = (total - bad) % MOD;
  if (ans < 0n) ans += MOD;
  return Number(ans);
};
var solve = stringCount;
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
module.exports = stringCount;
