var minimumBeautifulSubstrings = function(s) {
  const n = s.length;
  const powers = new Set();
  let p = 1;
  while (p <= 100000) {
    powers.add(p.toString(2));
    p *= 5;
  }

  const dp = new Int32Array(n + 1).fill(1e9);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (s[j] === '0') continue;
      const sub = s.slice(j, i);
      if (powers.has(sub)) {
        if (dp[j] + 1 < dp[i]) dp[i] = dp[j] + 1;
      }
    }
  }

  return dp[n] >= 1e9 ? -1 : dp[n];
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(JSON.stringify(minimumBeautifulSubstrings(JSON.parse(lines[i]))));
    }
  }
}

module.exports = minimumBeautifulSubstrings;
