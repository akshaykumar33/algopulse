var numberOfSubstrings = function(s) {
    let ans = 0;
    let l = 0;
    const count = [0, 0, 0];
    for (let r = 0; r < s.length; r++) {
        count[s.charCodeAt(r) - 97]++;
        while (count[0] > 0 && count[1] > 0 && count[2] > 0) {
            ans += s.length - r;
            count[s.charCodeAt(l) - 97]--;
            l++;
        }
    }
    return ans;
};

var solve = numberOfSubstrings;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
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
