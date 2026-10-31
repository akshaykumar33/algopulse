var fractionToRecurringDecimal = function(numerator, denominator) {
    if (numerator === 0) return "0";
    let res = [];
    if ((numerator < 0) ^ (denominator < 0)) res.push("-");
    let n = BigInt(Math.abs(numerator));
    let d = BigInt(Math.abs(denominator));
    res.push((n / d).toString());
    let rem = n % d;
    if (rem === 0n) return res.join("");
    res.push(".");
    let map = new Map();
    while (rem !== 0n) {
        if (map.has(rem)) {
            res.splice(map.get(rem), 0, "(");
            res.push(")");
            break;
        }
        map.set(rem, res.length);
        rem *= 10n;
        res.push((rem / d).toString());
        rem %= d;
    }
    return res.join("");
};

var solve = function(numerator, denominator) {
    if (Array.isArray(numerator) && denominator === undefined) {
        return fractionToRecurringDecimal(numerator[0], numerator[1]);
    }
    return fractionToRecurringDecimal(numerator, denominator);
};

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
        } catch (_) {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = solve;
