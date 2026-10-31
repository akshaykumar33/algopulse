var superPow = function(a, b) {
    const MOD = 1337;
    function power(base, exp) {
        let res = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp % 2 === 1) res = (res * base) % MOD;
            base = (base * base) % MOD;
            exp = Math.floor(exp / 2);
        }
        return res;
    }
    let ans = 1;
    for (let i = 0; i < b.length; i++) {
        ans = (power(ans, 10) * power(a, b[i])) % MOD;
    }
    return ans;
};
var solve = typeof superPow !== 'undefined' ? superPow : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        if (i + 1 < lines.length) {
          const a = JSON.parse(lines[i]);
          const b = JSON.parse(lines[i+1]);
          const result = solve(a, b);
          console.log(JSON.stringify(result));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
