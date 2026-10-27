var wordBreak = function(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.slice(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length];
};

var solve = typeof wordBreak !== 'undefined' ? wordBreak : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        try {
          const s = JSON.parse(lines[i]);
          const wordDict = JSON.parse(lines[i+1]);
          const result = solve(s, wordDict);
          console.log(JSON.stringify(result));
        } catch (e) {
          console.error('Local runner error:', e.message);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
