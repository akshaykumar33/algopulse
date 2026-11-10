var countVowels = function(word) {
  const n = word.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    const ch = word.charCodeAt(i);
    if (ch === 97 || ch === 101 || ch === 105 || ch === 111 || ch === 117) {
      ans += (i + 1) * (n - i);
    }
  }
  return ans;
};

var solve = countVowels;

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
