var minMaxSums = function(nums, k) {
  const MOD = 1000000007;
  const mul = (a, b) => ((a * (b >>> 16)) % MOD * 65536 + a * (b & 65535)) % MOD;
  const n = nums.length;
  const a = nums.slice().sort((x, y) => x - y);
  const fact = new Array(n + 1), inv = new Array(n + 1);
  fact[0] = 1;
  for (let i = 1; i <= n; i++) fact[i] = mul(fact[i - 1], i);
  const pw = (b, e) => {
    let r = 1;
    while (e > 0) {
      if (e & 1) r = mul(r, b);
      b = mul(b, b);
      e = Math.floor(e / 2);
    }
    return r;
  };
  inv[n] = pw(fact[n], MOD - 2);
  for (let i = n; i > 0; i--) inv[i - 1] = mul(inv[i], i);
  const ways = new Array(n);
  ways[0] = 1;
  for (let i = 0; i + 1 < n; i++) {
    const c = i >= k - 1 ? mul(fact[i], mul(inv[k - 1], inv[i - k + 1])) : 0;
    ways[i + 1] = (2 * ways[i] - c + MOD) % MOD;
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    const c = (ways[i] + ways[n - 1 - i]) % MOD;
    ans = (ans + mul(a[i] % MOD, c)) % MOD;
  }
  return ans;
};
var solve = minMaxSums;
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
module.exports = minMaxSums;
