const fs = require('fs');
function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const T = nextInt();
  if (T === null) return;
  const MOD = 998244353n;
  const out = [];
  function power(b, p) {
    let r = 1n;
    b = b % MOD;
    while (p > 0n) {
      if (p % 2n === 1n) r = (r * b) % MOD;
      b = (b * b) % MOD;
      p /= 2n;
    }
    return r;
  }
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const count = [];
    for (let b = 0; ; b++) {
      const low = 1 << b;
      if (low > n) break;
      const high = Math.min(n, (1 << (b + 1)) - 1);
      count.push(BigInt(high - low + 1));
    }
    let maxC = 0n;
    for (let i = 0; i < count.length; i++) {
      if (count[i] > maxC) maxC = count[i];
    }
    const maxK = Number(maxC);
    const fact = new Array(maxK + 1);
    const invFact = new Array(maxK + 1);
    fact[0] = 1n;
    for (let i = 1; i <= maxK; i++) fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
    invFact[maxK] = power(fact[maxK], MOD - 2n);
    for (let i = maxK - 1; i >= 0; i--) invFact[i] = (invFact[i + 1] * BigInt(i + 1)) % MOD;
    function nCr(N, R) {
      if (R < 0n || R > N) return 0n;
      return (fact[Number(N)] * invFact[Number(R)] % MOD * invFact[Number(N - R)]) % MOD;
    }
    const totalSubsets = power(2n, BigInt(n));
    let ans = 0n;
    const prefBinom = count.map(c => 1n);
    for (let m = 1; m <= maxK; m++) {
      let prod = 1n;
      for (let i = 0; i < count.length; i++) {
        prod = (prod * prefBinom[i]) % MOD;
        if (BigInt(m) <= count[i]) {
          prefBinom[i] = (prefBinom[i] + nCr(count[i], BigInt(m))) % MOD;
        }
      }
      const valid = (totalSubsets - prod + MOD) % MOD;
      ans = (ans + valid) % MOD;
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}
solve();