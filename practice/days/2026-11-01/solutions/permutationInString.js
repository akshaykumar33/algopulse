var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;
    const c1 = new Array(26).fill(0);
    const c2 = new Array(26).fill(0);
    for (let i = 0; i < s1.length; i++) {
        c1[s1.charCodeAt(i) - 97]++;
        c2[s2.charCodeAt(i) - 97]++;
    }
    const match = () => {
        for (let i = 0; i < 26; i++) {
            if (c1[i] !== c2[i]) return false;
        }
        return true;
    };
    if (match()) return true;
    for (let i = s1.length; i < s2.length; i++) {
        c2[s2.charCodeAt(i) - 97]++;
        c2[s2.charCodeAt(i - s1.length) - 97]--;
        if (match()) return true;
    }
    return false;
};
var solve = checkInclusion;

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
