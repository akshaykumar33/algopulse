var gcdOfStrings = function(str1, str2) {
  if (str1 + str2 !== str2 + str1) return "";
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  return str1.slice(0, gcd(str1.length, str2.length));
};

var solve = gcdOfStrings;

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
    process.exit(0);
  }
}
module.exports = solve;
