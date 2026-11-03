var additiveNumber = function(num) {
    const n = num.length;
    if (n < 3) return false;
    for (let i = 1; i <= n / 2; i++) {
        if (num[0] === '0' && i > 1) break;
        for (let j = 1; n - i - j >= Math.max(i, j); j++) {
            if (num[i] === '0' && j > 1) break;
            let num1 = num.slice(0, i);
            let num2 = num.slice(i, i + j);
            let k = i + j;
            while (k < n) {
                let sum = (BigInt(num1) + BigInt(num2)).toString();
                if (!num.startsWith(sum, k)) break;
                k += sum.length;
                num1 = num2;
                num2 = sum;
            }
            if (k === n) return true;
        }
    }
    return false;
};
var solve = typeof additiveNumber !== 'undefined' ? additiveNumber : null;

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
