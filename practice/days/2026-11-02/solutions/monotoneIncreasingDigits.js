var monotoneIncreasingDigits = function(n) {
    const s = String(n).split('').map(Number);
    let marker = s.length;
    for (let i = s.length - 1; i > 0; i--) {
        if (s[i] < s[i - 1]) {
            marker = i;
            s[i - 1]--;
        }
    }
    for (let i = marker; i < s.length; i++) {
        s[i] = 9;
    }
    return Number(s.join(''));
};
var solve = typeof monotoneIncreasingDigits !== 'undefined' ? monotoneIncreasingDigits : null;

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
