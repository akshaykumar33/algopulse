var countArrangement = function(n) {
  const total = 1 << n;
  const dp = new Int32Array(total);
  dp[0] = 1;

  for (let mask = 0; mask < total; mask++) {
    if (dp[mask] === 0) continue;
    let count = 0;
    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) !== 0) count++;
    }
    const pos = count + 1;
    for (let num = 1; num <= n; num++) {
      const bit = 1 << (num - 1);
      if ((mask & bit) === 0) {
        if (num % pos === 0 || pos % num === 0) {
          dp[mask | bit] += dp[mask];
        }
      }
    }
  }

  return dp[total - 1];
};

var solve = function(n) {
  return countArrangement(Number(n));
};

// ---------------- LOCAL TEST HARNESS ----------------
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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

