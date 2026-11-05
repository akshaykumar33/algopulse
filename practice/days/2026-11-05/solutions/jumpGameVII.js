var jumpGameVII = function(s, minJump, maxJump) {
    let n = s.length;
    let dp = new Array(n).fill(false);
    dp[0] = true;
    let cnt = 0;
    for (let i = 0; i < n; i++) {
        if (i >= minJump && dp[i - minJump]) {
            cnt++;
        }
        if (i > maxJump && dp[i - maxJump - 1]) {
            cnt--;
        }
        if (cnt > 0 && s[i] === '0') {
            dp[i] = true;
        }
    }
    return dp[n - 1];
};
var solve = typeof jumpGameVII !== 'undefined' ? jumpGameVII : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 3) {
        if (i + 2 < lines.length) {
          const s = JSON.parse(lines[i]);
          const minJump = JSON.parse(lines[i+1]);
          const maxJump = JSON.parse(lines[i+2]);
          const result = solve(s, minJump, maxJump);
          console.log(JSON.stringify(result));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
