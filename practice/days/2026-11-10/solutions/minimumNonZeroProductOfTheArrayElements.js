var minNonZeroProduct = function(p) {
  if (p === 1) return 1;
  const mod = 1000000007n;
  const one = 1n;
  const pBig = BigInt(p);
  const maxVal = (one << pBig) - one;
  const base = maxVal - one;
  const exp = (one << (pBig - one)) - one;

  function modPow(b, e, m) {
    let res = 1n;
    b = b % m;
    while (e > 0n) {
      if (e & 1n) res = (res * b) % m;
      b = (b * b) % m;
      e >>= 1n;
    }
    return res;
  }

  const power = modPow(base, exp, mod);
  const ans = (power * (maxVal % mod)) % mod;
  return Number(ans);
};

var solve = minNonZeroProduct;

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
  } catch (err) {}
}

module.exports = solve;
