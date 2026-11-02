var myAtoi = function(s) {
    let i = 0;
    const n = s.length;
    let sign = 1;
    let res = 0;

    while (i < n && s[i] === ' ') {
        i++;
    }

    if (i < n && (s[i] === '+' || s[i] === '-')) {
        sign = (s[i] === '-') ? -1 : 1;
        i++;
    }

    const MAX_INT = 2147483647;
    const MIN_INT = -2147483648;

    while (i < n && s[i] >= '0' && s[i] <= '9') {
        const digit = parseInt(s[i]);

        if (sign === 1) {
            if (res > Math.floor(MAX_INT / 10) || (res === Math.floor(MAX_INT / 10) && digit > 7)) {
                return MAX_INT;
            }
        } else {
            if (res > Math.floor(MAX_INT / 10) || (res === Math.floor(MAX_INT / 10) && digit > 8)) {
                return MIN_INT;
            }
        }

        res = res * 10 + digit;
        i++;
    }

    return res * sign;
};


var solve = typeof myAtoi !== 'undefined' ? myAtoi : null;

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
