var baseNeg2 = function(n) {
  if (n === 0) return "0";
  const bits = [];
  while (n !== 0) {
    let rem = n % -2;
    n = Math.trunc(n / -2);
    if (rem < 0) {
      rem += 2;
      n += 1;
    }
    bits.push(rem);
  }
  return bits.reverse().join('');
};

var solve = baseNeg2;
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
