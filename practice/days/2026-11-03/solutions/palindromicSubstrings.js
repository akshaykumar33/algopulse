var countSubstrings = function(s) {
    let n = s.length;
    let ans = 0;
    for (let i = 0; i < n; i++) {
        let l = i, r = i;
        while (l >= 0 && r < n && s[l] === s[r]) {
            ans++;
            l--;
            r++;
        }
        l = i;
        r = i + 1;
        while (l >= 0 && r < n && s[l] === s[r]) {
            ans++;
            l--;
            r++;
        }
    }
    return ans;
};
var solve = countSubstrings;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const arg = JSON.parse(line);
        const result = solve(arg);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
