var numberOfWays = function(startPos, endPos, k) {
  const diff = Math.abs(endPos - startPos);
  if (diff > k || ((k - diff) & 1) !== 0) return 0;

  const MOD = 1000000007n;
  const modPow = (base, exp) => {
    let res = 1n;
    let b = base % MOD;
    let e = exp;
    while (e > 0n) {
      if (e & 1n) res = (res * b) % MOD;
      b = (b * b) % MOD;
      e >>= 1n;
    }
    return res;
  };

  let r = (k - diff) >> 1;
  if (r > k - r) r = k - r;
  let num = 1n;
  let den = 1n;
  for (let i = 0; i < r; i++) {
    num = (num * BigInt(k - i)) % MOD;
    den = (den * BigInt(i + 1)) % MOD;
  }
  return Number((num * modPow(den, MOD - 2n)) % MOD);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const arity = numberOfWays.length;
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === arity;
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(numberOfWays(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + arity - 1 < lines.length; i += arity) {
        const args = lines.slice(i, i + arity).map((l) => JSON.parse(l));
        console.log(JSON.stringify(numberOfWays(...args)));
      }
    }
  }
}
