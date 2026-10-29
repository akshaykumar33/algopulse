var complexNumberMultiply = function(num1, num2) {
  const p1 = num1.split('+');
  const a = parseInt(p1[0], 10);
  const b = parseInt(p1[1].slice(0, -1), 10);

  const p2 = num2.split('+');
  const c = parseInt(p2[0], 10);
  const d = parseInt(p2[1].slice(0, -1), 10);

  const real = a * c - b * d;
  const imag = a * d + b * c;
  return real + '+' + imag + 'i';
};

var solve = typeof complexNumberMultiply !== 'undefined' ? complexNumberMultiply : null;

// ---------------- LOCAL TEST HARNESS ----------------
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
