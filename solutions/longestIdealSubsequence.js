var longestIdealString = function(s, k) {
  const dp = new Int32Array(26);
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i) - 97;
    let best = 0;
    const l = Math.max(0, c - k);
    const r = Math.min(25, c + k);
    for (let p = l; p <= r; p++) {
      if (dp[p] > best) best = dp[p];
    }
    dp[c] = best + 1;
  }
  let max = 0;
  for (let i = 0; i < 26; i++) {
    if (dp[i] > max) max = dp[i];
  }
  return max;
};

var solve = longestIdealString;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}
