var integerReplacement = function(n) {
    let cnt = 0;
    while (n > 1) {
        if (n % 2 === 0) {
            n /= 2;
        } else if (n === 3 || (n & 3) === 1) {
            n -= 1;
        } else {
            n += 1;
        }
        cnt++;
    }
    return cnt;
};

var solve = typeof integerReplacement !== 'undefined' ? integerReplacement : null;

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
          console.log(JSON.stringify(solve(Number(line))));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
