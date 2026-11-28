var sumAndMultiply = function(s, queries) {
  const MOD = 1000000007;
  const mul = (a, b) => ((a * (b >>> 16)) % MOD * 65536 + a * (b & 65535)) % MOD;
  const m = s.length;
  const val = new Array(m + 1).fill(0), cnt = new Int32Array(m + 1), sum = new Int32Array(m + 1);
  const pw = new Array(m + 1);
  pw[0] = 1;
  for (let i = 1; i <= m; i++) pw[i] = pw[i - 1] * 10 % MOD;
  for (let i = 0; i < m; i++) {
    const d = s.charCodeAt(i) - 48;
    if (d) {
      val[i + 1] = (val[i] * 10 + d) % MOD;
      cnt[i + 1] = cnt[i] + 1;
    } else {
      val[i + 1] = val[i];
      cnt[i + 1] = cnt[i];
    }
    sum[i + 1] = sum[i] + d;
  }
  const ans = new Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    const l = queries[i][0], r = queries[i][1] + 1;
    const x = (val[r] - mul(val[l], pw[cnt[r] - cnt[l]]) + MOD) % MOD;
    ans[i] = mul(x, sum[r] - sum[l]);
  }
  return ans;
};
var solve = sumAndMultiply;
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
module.exports = sumAndMultiply;
