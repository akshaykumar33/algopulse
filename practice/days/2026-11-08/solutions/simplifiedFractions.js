var simplifiedFractions = function(n) {
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const ans = [];
  for (let d = 2; d <= n; d++) {
    for (let num = 1; num < d; num++) {
      if (gcd(num, d) === 1) {
        ans.push(num + "/" + d);
      }
    }
  }
  return ans;
};

var solve = simplifiedFractions;
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
