var solve = function(s) {
  const n = s.length;
  for (let i = 1; i <= Math.floor(n / 2); i++) {
    if (n % i === 0) {
      const sub = s.slice(0, i);
      let ok = true;
      for (let j = i; j < n; j += i) {
        if (s.slice(j, j + i) !== sub) {
          ok = false;
          break;
        }
      }
      if (ok) return true;
    }
  }
  return false;
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
