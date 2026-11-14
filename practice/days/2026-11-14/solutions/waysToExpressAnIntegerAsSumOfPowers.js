var numberOfWays = function(n, x) {
  const MOD = 1000000007;
  const dp = new Int32Array(n + 1);
  dp[0] = 1;

  for (let i = 1; ; i++) {
    const p = Math.pow(i, x);
    if (p > n) break;
    for (let w = n; w >= p; w--) {
      dp[w] = (dp[w] + dp[w - p]) % MOD;
    }
  }
  return dp[n];
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(numberOfWays(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = numberOfWays;
