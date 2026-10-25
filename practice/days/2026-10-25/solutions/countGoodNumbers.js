var countGoodNumbers = function(n) {
  const MOD = 1000000007n;
  function power(base, exp) {
    let res = 1n;
    base = base % MOD;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp = exp / 2n;
    }
    return res;
  }
  const bn = BigInt(n);
  const evens = (bn + 1n) / 2n;
  const odds = bn / 2n;
  const ans = (power(5n, evens) * power(4n, odds)) % MOD;
  return Number(ans);
};

var solve = countGoodNumbers;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const n = JSON.parse(lines[i]);
        const result = solve(n);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = countGoodNumbers;
