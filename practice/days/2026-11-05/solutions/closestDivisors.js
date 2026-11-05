var closestDivisors = function(num) {
    function find(n) {
        let root = Math.floor(Math.sqrt(n));
        for (let i = root; i >= 1; i--) {
            if (n % i === 0) {
                return [i, n / i];
            }
        }
        return [1, n];
    }
    let r1 = find(num + 1);
    let r2 = find(num + 2);
    let diff1 = Math.abs(r1[0] - r1[1]);
    let diff2 = Math.abs(r2[0] - r2[1]);
    let ans = diff1 < diff2 ? r1 : r2;
    ans.sort((a, b) => a - b);
    return ans;
};
var solve = typeof closestDivisors !== 'undefined' ? closestDivisors : null;

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
