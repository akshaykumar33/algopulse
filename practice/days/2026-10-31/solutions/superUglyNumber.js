var superUglyNumber = function(n, primes) {
    const dp = new Array(n);
    dp[0] = 1;
    const k = primes.length;
    const idx = new Array(k).fill(0);
    const values = new Array(k);
    for (let i = 0; i < k; i++) {
        values[i] = primes[i];
    }
    for (let i = 1; i < n; i++) {
        let minVal = Infinity;
        for (let j = 0; j < k; j++) {
            if (values[j] < minVal) {
                minVal = values[j];
            }
        }
        dp[i] = minVal;
        for (let j = 0; j < k; j++) {
            if (values[j] === minVal) {
                idx[j]++;
                values[j] = dp[idx[j]] * primes[j];
            }
        }
    }
    return dp[n - 1];
};
var solve = typeof superUglyNumber !== 'undefined' ? superUglyNumber : null;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let i = 0;
      while (i < lines.length) {
        const n = JSON.parse(lines[i++]);
        const primes = JSON.parse(lines[i++]);
        const result = solve(n, primes);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
