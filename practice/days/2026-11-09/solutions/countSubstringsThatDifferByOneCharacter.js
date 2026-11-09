var countSubstrings = function(s, t) {
  let ans = 0;
  const n = s.length;
  const m = t.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let diff = 0;
      for (let k = 0; i + k < n && j + k < m; k++) {
        if (s[i + k] !== t[j + k]) {
          diff++;
        }
        if (diff === 1) {
          ans++;
        } else if (diff > 1) {
          break;
        }
      }
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
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = solve;
